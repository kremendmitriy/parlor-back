// TODO Create saving refresh token in db
import { UserRole } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refresh_token';
  constructor(
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueToken(user.id, user.role);

    const { password, ...userData } = user;
    return { user: userData, ...tokens };
  }

  async register(dto: RegisterDto) {
    const user = await this.userService.create(dto);
    const tokens = await this.issueToken(user.id, user.role);

    const { password, ...userData } = user;
    return { user: userData, ...tokens };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async getNewTokens(refreshToken: string) {
    try {
      const result = await this.jwt.verifyAsync(refreshToken);
      const user = await this.userService.getById(result.id);

      if (!user) throw new UnauthorizedException('User not found');

      const tokens = await this.issueToken(user.id, user.role);

      const { password, ...userData } = user;
      return { user: userData, ...tokens };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private async issueToken(userId: string, role: UserRole) {
    const data = { id: userId, role: role };

    const accessToken = await this.jwt.signAsync(data, { expiresIn: '1h' });
    const refreshToken = await this.jwt.signAsync(data, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}

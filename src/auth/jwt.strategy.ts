import { User, UserRole } from '@prisma/client';
import { UserService } from './../user/user.service';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { id: string; role: UserRole }): Promise<User> {
    console.log('JwtStrategy: validate called');
    console.log('JWT Payload:', payload);
    const user = await this.userService.getById(payload.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    console.log('Validated User:', user);
    return user;
  }
}

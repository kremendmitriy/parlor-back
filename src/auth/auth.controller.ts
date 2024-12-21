import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test() {
    return { message: 'Test successful' };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const result = await this.authService.register(dto);
    this.authService.addRefreshTokenToResponse(res, result.refreshToken);
    return res.json({ user: result.user, accessToken: result.accessToken });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(dto);
    this.authService.addRefreshTokenToResponse(res, result.refreshToken);
    return res.json({ user: result.user, accessToken: result.accessToken });
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    const result = await this.authService.getNewTokens(refreshToken);
    this.authService.addRefreshTokenToResponse(res, result.refreshToken);
    return res.json({ user: result.user, accessToken: result.accessToken });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);
    return res.json({ message: 'Logged out' });
  }
}

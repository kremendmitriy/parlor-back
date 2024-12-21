import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.ADMIN)
  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users.map(({ password, ...userData }) => userData);
  }

  @Roles(UserRole.ADMIN)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getById(id);
    const { password, ...userData } = user;
    return userData;
  }
}

import { Controller, Get, Delete, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 获取Token
   */
  @Get()
  getToken() {}

  /**
   * 删除Token
   */
  @Delete()
  deleteToken() {}

  @Post('login')
  async login(@Body() cto: LoginUserDto) {
    return this.authService.loginUser(cto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout() {}
}

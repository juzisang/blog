import { Controller, Get, Delete, UseGuards, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() cto: LoginUserDto) {
    return this.authService.loginUser(cto);
  }
}

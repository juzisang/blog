import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './auth.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() cto: LoginUserDto) {
    return this.authService.loginUser(cto);
  }
}

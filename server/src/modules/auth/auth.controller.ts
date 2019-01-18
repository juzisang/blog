import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './auth.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() cto: LoginUserDto) {
    return this.authService.loginUser(cto);
  }
}

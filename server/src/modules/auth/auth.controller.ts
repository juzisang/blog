import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Get()
  getAdmin() {
    return this.authService.getAdmin();
  }
}

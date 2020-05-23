import { Controller, Post, Body } from "@nestjs/common";
import { UserDto } from "../user/user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  @Post()
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto)
  }

}

import { Controller, Post, Body } from "@nestjs/common";
import { UserDto } from "../user/user.dto";
import { AuthService } from "./auth.service";
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  @ApiOkResponse({ type: String, description: '返回Token' })
  @Post('/login')
  login(@Body() userDto: UserDto): Promise<string> {
    return this.authService.login(userDto)
  }
}

import { Controller, Get, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "@app/common/auth.decorator";
import { ApiTags, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";
import { UserDto } from "./user.dto";

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @ApiOkResponse({ description: '获取用户信息', type: UserEntity })
  @Auth()
  @Get()
  getUserInfo() {
    return this.userService.findOne({ username: process.env.USER_ROOT_NAME })
  }

  @ApiOkResponse({ type: String, description: '返回Token' })
  @Post('/login')
  login(@Body() userDto: UserDto): Promise<string> {
    return this.userService.login(userDto)
  }
}

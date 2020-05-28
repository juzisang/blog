import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "@app/common/auth.decorator";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Auth()
  @Get()
  getUserInfo() {
    return this.userService.findOne({ username: process.env.USER_ROOT_NAME })
  }

}

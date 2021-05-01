import { UserDto } from '@app/app.dto'
import { UserService } from '@app/service/user.service'
import { Controller, Post, Body } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) { }

  @Post('login')
  login (@Body() userDto: UserDto) {
    return this.userService.login(userDto)
  }
}

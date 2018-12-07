import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /**
   * 获取用户信息
   */
  @Get()
  find() {}

  /**
   * 修改用户
   */
  @Put(':id')
  update() {}
}

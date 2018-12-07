import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from '../auth/dto/login-user.dto';

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

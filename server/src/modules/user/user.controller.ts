import { Controller, Get, Put, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UpdateUserDto, UpdatePasswordDto } from './user.dto';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /**
   * 获取用户信息
   */
  @Get()
  async findRoot() {
    const _user = await this.userService.findRoot();
    const { name, slogan, uid, avatar } = _user;
    const user = { name, slogan, uid, avatar };
    return user;
  }

  /**
   * 修改用户
   */
  @UseGuards(AuthGuard())
  @Put()
  update(@Body() dto: UpdateUserDto) {
    return this.userService.update(dto).then(() => '修改成功');
  }

  /**
   * 修改密码
   */
  @UseGuards(AuthGuard())
  @Put('password')
  updatePwd(@Body() dto: UpdatePasswordDto) {
    return this.userService.updatePwd(dto).then(() => '修改成功');
  }
}

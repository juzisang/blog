import { Controller, Get, Put, UseGuards, Body, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /**
   * 获取用户信息
   */
  @Get(':name')
  async findOne(@Param('name') uName) {
    const _user = await this.userService.findUser({ name: uName });
    const { name, slogan, uid, avatar, url } = _user;
    const user = { name, slogan, uid, avatar, url };
    return user;
  }

  /**
   * 修改用户
   */
  @UseGuards(AuthGuard())
  @Put()
  update(@User('uid') uid, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(uid, dto).then(() => '修改成功');
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

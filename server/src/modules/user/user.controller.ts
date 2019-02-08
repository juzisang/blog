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

  // ADMIN

  @Put()
  @UseGuards(AuthGuard())
  updateUser(@Body() dto: UpdateUserDto) {
    return this.userService.updateAdmin(dto).then(() => '修改成功');
  }

  @Put('password')
  @UseGuards(AuthGuard())
  updatePwd(@Body() dto: UpdatePasswordDto) {
    return this.userService.updateAdminPwd(dto).then(() => '修改成功');
  }

  // PUBLIC

  @Get()
  async findAdmin() {
    const _user = await this.userService.getAdmin();
    const { name, slogan, uid, avatar } = _user;
    const user = { name, slogan, uid, avatar };
    return user;
  }
}

import {
  Controller,
  Get,
  Put,
  UseGuards,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResponseData } from 'src/common/utils/response.data';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /**
   * 获取用户信息
   */
  @UseGuards(AuthGuard())
  @Get(':id')
  async findOne(@Param('id') id) {
    return new ResponseData(await this.userService.findOneUser({ id }));
  }

  /**
   * 修改用户
   */
  @UseGuards(AuthGuard())
  @Put()
  update(@User('id') id, @Body() dto: UpdateUserDto) {
    return this.userService
      .updateUser(id, dto)
      .then(() => new ResponseData('修改成功'));
  }

  /**
   * 修改密码
   */
  @UseGuards(AuthGuard())
  @Put('password')
  updatePwd(@Body() dto: UpdatePasswordDto) {
    return this.userService
      .updatePwd(dto)
      .then(() => new ResponseData('修改成功'));
  }
}

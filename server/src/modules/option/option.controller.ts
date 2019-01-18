import { Controller, Put, Get, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/decorators/user.decorator';

import { OptionService } from './option.service';
import { OptionDto } from './option.dto';
import { UserService } from '../user/user.service';

@ApiBearerAuth()
@ApiUseTags('option')
@Controller('option')
export class OptionController {
  constructor(
    private readonly optionService: OptionService,
    private readonly userService: UserService,
  ) {}

  /**
   * 更新配置
   */
  @UseGuards(AuthGuard())
  @Put()
  update(@User('uid') uid: number, @Body() dto: OptionDto) {
    return this.optionService.updateOption(uid, dto);
  }

  /**
   * 返回配置
   */
  @Get()
  async find() {
    const user = await this.userService.findRoot();
    return this.optionService.findOption(user.uid);
  }
}

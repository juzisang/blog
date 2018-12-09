import {
  Controller,
  Put,
  Get,
  Body,
  UseGuards,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { OptionService } from '../service/option.service';
import { OptionDto } from '../dto/option.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';
import { UserService } from '../service/user.service';

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

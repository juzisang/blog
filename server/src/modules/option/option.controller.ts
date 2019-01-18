import { Controller, Put, Get, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { OptionService } from './option.service';
import { OptionDto } from './option.dto';

@ApiBearerAuth()
@ApiUseTags('option')
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  /**
   * 更新配置
   */
  @UseGuards(AuthGuard())
  @Put()
  update(@Body() dto: OptionDto) {
    return this.optionService.updateOption(dto);
  }

  /**
   * 返回配置
   */
  @Get()
  async find() {
    return this.optionService.findOption();
  }
}

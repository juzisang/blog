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

  // ADMIN

  @Put()
  @UseGuards(AuthGuard())
  updateOption(@Body() dto: OptionDto) {
    return this.optionService.updateOption(dto);
  }

  // PUBLIC

  @Get()
  async getOption() {
    return this.optionService.findOption();
  }
}

import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigDto } from './config.dto';
import { ConfigService } from './config.service';

@Controller('/config')
export class ConfigController {
  constructor(private readonly articleService: ConfigService) {}

  @UseGuards(AuthGuard())
  @Post()
  updateConfig(@Body() dto: ConfigDto) {
    return this.articleService.updateConfig(dto);
  }

  @Get()
  getConfig() {
    return this.articleService.getConfig();
  }
}

import { Controller, Put, Get } from '@nestjs/common';
import { OptionService } from './option.service';

@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  /**
   * 更新配置
   */
  @Put()
  update() {}

  /**
   * 返回配置
   */
  @Get()
  find() {}
}

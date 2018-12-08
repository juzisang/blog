import { Module, OnModuleInit } from '@nestjs/common';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { DEFAULT_DATA } from '../../app.config';

@Module({
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule implements OnModuleInit {
  constructor(private readonly optionService: OptionService) {}

  onModuleInit() {
    this.createDefaultOption();
  }

  async createDefaultOption() {
    if (!(await this.optionService.findOneOption())) {
      this.optionService.createdOption({
        ...DEFAULT_DATA.option,
      });
    }
  }
}

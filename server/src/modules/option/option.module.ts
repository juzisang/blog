import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';

@Module({
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}

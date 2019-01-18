import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OptionEntity } from './option.entity';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([OptionEntity])],
  controllers: [OptionController],
  providers: [OptionService, UserService],
})
export class OptionModule {}

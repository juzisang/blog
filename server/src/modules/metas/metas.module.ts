import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MetasEntity } from './metas.entity';
import { CategoryController } from './category.controller';
import { TagController } from './tag.controller';
import { MetasService } from './metas.service';

@Module({
  imports: [TypeOrmModule.forFeature([MetasEntity])],
  controllers: [CategoryController, TagController],
  providers: [MetasService],
})
export class MetasModule {}

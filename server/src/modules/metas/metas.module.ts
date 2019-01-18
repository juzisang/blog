import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MetasEntity } from './metas.entity';
import { RelationshipsEntity } from './relationships.entity';
import { MetasController } from './metas.controller';
import { MetasService } from './metas.service';

@Module({
  imports: [TypeOrmModule.forFeature([MetasEntity, RelationshipsEntity])],
  controllers: [MetasController],
  providers: [MetasService],
})
export class MetasModule {}

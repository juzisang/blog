import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MetasDto } from './metas.dto';
import { MetasEntity } from './metas.entity';

@Injectable()
export class MetasService {
  constructor(
    @InjectRepository(MetasEntity)
    private readonly metasEntity: Repository<MetasEntity>,
  ) {}

  addMeta(type: 'tag' | 'category', dto: MetasDto) {
    const category = this.metasEntity.create({ ...dto, type });
    return this.metasEntity
      .findOne({ name: dto.name })
      .then<MetasEntity>(entity => (entity ? Promise.reject(new BadRequestException(`${category.name} 已经存在`)) : category))
      .then(entity => this.metasEntity.save(entity));
  }

  updateMeta(type: 'tag' | 'category', id: number, dto: MetasDto) {
    return this.metasEntity
      .findOneOrFail({ id, type })
      .then(() => this.metasEntity.update({ id, type }, dto))
  }

  getMetas(type: 'tag' | 'category') {
    return this.metasEntity.find({ type });
  }

  getMeta(type: 'tag' | 'category', name: string) {
    return this.metasEntity.findOneOrFail({ name, type }).catch(() => `${name} 不存在`);
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetasEntity } from '../entity/metas.entity';
import { Repository } from 'typeorm';
import { MetasDto } from '../dto/metas.dto';

@Injectable()
export class MetasService {
  constructor(
    @InjectRepository(MetasEntity)
    private readonly metasEntity: Repository<MetasEntity>,
  ) {}

  findMeta(type: 'tag' | 'category', data: { name?: string; mid?: number }) {
    return this.metasEntity.findOne({ type, ...data });
  }

  findMetas(type: 'tag' | 'category') {
    return this.metasEntity.find({ where: { type } });
  }

  async createMeta(type: 'tag' | 'category', dto: MetasDto) {
    const meta = await this.findMeta(type, { name: dto.name });
    if (meta) {
      throw new BadRequestException(`${type} 已经存在`);
    }
    return await this.metasEntity.save(
      this.metasEntity.create({ ...dto, type }),
    );
  }

  async updateMeta(type: 'tag' | 'category', dto: MetasDto) {
    const meta = await this.findMeta(type, { name: dto.name });
    if (!meta) {
      throw new BadRequestException(`${type} 不存在`);
    }
    return await this.metasEntity.update(meta, dto);
  }

  async deleteMeta(type: 'tag' | 'category', mid: number) {
    const meta = await this.findMeta(type, { mid });
    if (!meta) {
      throw new BadRequestException(`${type} 不存在`);
    }
    return this.metasEntity.delete(mid);
  }
}

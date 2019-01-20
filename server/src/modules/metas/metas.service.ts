import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetasEntity } from './metas.entity';
import { Repository } from 'typeorm';
import { CreateMetasDto, QueryMetasDto, UpdateMetasDto, DeleteQueryMetasDto } from './metas.dto';
import { RelationshipsEntity } from './relationships.entity';
import { ArticleEntity } from '../article/article.entity';

@Injectable()
export class MetasService {
  constructor(
    @InjectRepository(MetasEntity)
    private readonly metasEntity: Repository<MetasEntity>,
  ) {}

  findOne(type: 'tag' | 'category', data: QueryMetasDto) {
    return this.metasEntity
      .createQueryBuilder('metas')
      .leftJoin(RelationshipsEntity, 'relationships', 'metas.mid = relationships.mid')
      .leftJoinAndMapMany('metas.articles', ArticleEntity, 'article', 'relationships.aid = article.aid')
      .where('type = :type', { type })
      .andWhere('metas.name = :name OR metas.mid = :mid', { name: data.name, mid: data.mid })
      .getOne();
  }

  async findAll(type: 'tag' | 'category') {
    return this.metasEntity
      .createQueryBuilder('metas')
      .select(['metas.mid as mid', 'metas.name as name', 'metas.slug as slug', 'metas.description as description', 'metas.type as type'])
      .addSelect('COUNT(relationships.aid)', 'articleNum')
      .leftJoin(RelationshipsEntity, 'relationships', 'metas.mid = relationships.mid')
      .where('type = :type', { type })
      .groupBy('metas.mid')
      .orderBy('articleNum', 'DESC')
      .getRawMany();
  }

  async create(type: 'tag' | 'category', dto: CreateMetasDto) {
    const meta = await this.metasEntity.findOne({ type, name: dto.name });
    if (meta) {
      throw new BadRequestException(`${type} 已经存在`);
    }
    return await this.metasEntity.save(this.metasEntity.create({ ...dto, type }));
  }

  async update(type: 'tag' | 'category', dto: UpdateMetasDto) {
    const meta = await this.metasEntity.findOne(dto.mid);
    if (!meta) {
      throw new BadRequestException(`${type} 不存在`);
    }
    await this.metasEntity.update(dto.mid, dto);
    return '修改成功';
  }

  async delete(type: 'tag' | 'category', dto: DeleteQueryMetasDto) {
    const meta = await this.metasEntity.findOne(dto.mid);
    if (!meta) {
      throw new BadRequestException(`${type} 不存在`);
    }
    await this.metasEntity.delete(dto.mid);
    return '删除成功';
  }
}

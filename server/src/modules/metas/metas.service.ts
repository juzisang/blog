import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetasEntity } from './metas.entity';
import { Repository } from 'typeorm';
import { SaveMetasDto, QueryMetasDto } from './metas.dto';
import { RelationshipsEntity } from './relationships.entity';
import { ArticleEntity } from '../article/article.entity';

@Injectable()
export class MetasService {
  constructor(
    @InjectRepository(MetasEntity)
    private readonly metasEntity: Repository<MetasEntity>,
  ) {}

  /**
   * 返货 tag category，及其所属文章
   */
  findOne(type: 'tag' | 'category', data: QueryMetasDto) {
    return this.metasEntity
      .createQueryBuilder('metas')
      .leftJoin(RelationshipsEntity, 'relationships', 'metas.mid = relationships.mid')
      .leftJoinAndMapMany('metas.articles', ArticleEntity, 'article', 'relationships.aid = article.aid')
      .where('type = :type', { type })
      .andWhere('metas.name = :name OR metas.mid = :mid', { name: data.name, mid: data.mid })
      .getOne();
  }

  /**
   * 返回 tag category 列表，及其文章数
   */
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

  /**
   * 创建 tag category
   */
  async create(type: 'tag' | 'category', dto: SaveMetasDto) {
    const meta = await this.metasEntity.findOne({ type, name: dto.name });
    if (meta) {
      throw new BadRequestException(`${type} 已经存在`);
    }
    await this.metasEntity.save(this.metasEntity.create({ ...dto, type }));
  }

  /**
   * 更新 tag category
   */
  async update(type: 'tag' | 'category', mid: number, dto: SaveMetasDto) {
    await this.findOneOrFail(type, mid);
    await this.metasEntity.update(mid, dto);
  }

  /**
   * 删除 tag category
   */
  async delete(type: 'tag' | 'category', mid) {
    await this.findOneOrFail(type, mid);
    await this.metasEntity.manager.transaction(async entityManager => {
      // 删除文章与meta关系
      await entityManager.delete(RelationshipsEntity, { mid });
      // 删除meta
      await entityManager.delete(MetasEntity, { mid });
    });
  }

  /**
   * 不存在，即报错
   */
  private async findOneOrFail(type: string, mid: number) {
    const meta = await this.metasEntity.findOne(mid);
    if (!meta) {
      throw new BadRequestException(`${type} 不存在`);
    }
  }
}

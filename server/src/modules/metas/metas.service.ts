import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MetasDto } from './metas.dto';
import { MetasEntity } from './metas.entity';
import { RelationshipsEntity } from '@app/modules/article/relationships.entity';
import { ArticleEntity } from '@app/modules/article/article.entity';

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
    return this.metasEntity.findOneOrFail({ id, type }).then(() => this.metasEntity.update({ id, type }, dto));
  }

  getMetas(type: 'tag' | 'category') {
    return this.metasEntity
      .createQueryBuilder('metas')
      .select(['metas.id as id', 'metas.name as name', 'metas.slug as slug', 'metas.description as description', 'metas.type as type', 'metas.ctime as ctime', 'metas.utime as utime'])
      .addSelect('COUNT(relationships.aid)', 'articleCount')
      .leftJoin(RelationshipsEntity, 'relationships', 'relationships.mid = metas.id')
      .where('metas.type = :type', { type })
      .groupBy('metas.id')
      .orderBy('articleCount', 'DESC')
      .getRawMany();
  }

  async getMeta(type: 'tag' | 'category', id: number) {
    return this.metasEntity
      .findOneOrFail({ id, type })
      .then(async tag => {
        const articles = await this.metasEntity.manager
          .createQueryBuilder(ArticleEntity, 'article')
          .leftJoin(RelationshipsEntity, 'relationships', 'relationships.aid = article.id')
          .leftJoinAndMapOne('article.category', MetasEntity, 'metas', 'metas.id = relationships.mid AND metas.type = :type', { type: 'category' })
          .getMany();
        return [tag, articles];
      })
      .then(([tag, articles]) => ({ ...tag, articles }));
  }
}

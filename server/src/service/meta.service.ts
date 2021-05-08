import { MetaDto } from '@app/app.dto'
import { ArticleMetaRelationEntity } from '@app/entity/article_meta_relation.entity'
import { MetaEntity } from '@app/entity/meta.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MetaService {
  constructor(@InjectRepository(MetaEntity) private readonly metaEntity: Repository<MetaEntity>) {}

  getListAndCount(type: 'tag' | 'category') {
    return this.metaEntity
      .createQueryBuilder('meta')
      .select(['meta.id as id', 'meta.name as name', 'meta.alias as alias', 'meta.description as description'])
      .addSelect('COUNT(relation.id)', 'articleCount')
      .leftJoin(ArticleMetaRelationEntity, 'relation', 'meta.id=relation.metaId')
      .where('meta.type=:type', { type })
      .groupBy('meta.id')
      .getRawMany()
  }

  getList(type: 'tag' | 'category') {
    return this.metaEntity.find({ type })
  }

  async save(dto: MetaDto, type: 'tag' | 'category') {
    const meta = await this.metaEntity.findOne({ name: dto.name, type })
    await this.metaEntity.save(this.metaEntity.create({ ...meta, ...dto, type }))
  }

  getCount(type: 'tag' | 'category') {
    return this.metaEntity.count({ type })
  }
}

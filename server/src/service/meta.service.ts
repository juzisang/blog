import { MetaDto } from '@app/app.dto'
import { ArticleMetaRelationEntity } from '@app/entity/article_meta_relation.entity'
import { MetaEntity } from '@app/entity/meta.entity'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import assert from 'assert'
import { Repository } from 'typeorm'

@Injectable()
export class MetaService {
  constructor(@InjectRepository(MetaEntity) private readonly metaEntity: Repository<MetaEntity>, @InjectRepository(ArticleMetaRelationEntity) private readonly articleMetaRelationEntity: Repository<ArticleMetaRelationEntity>) {}

  getAll(type: 'tag' | 'category') {
    return this.metaEntity.find({ type })
  }

  async save(dto: MetaDto, type: 'tag' | 'category') {
    assert.ok(!(await this.metaEntity.findOne({ ...dto, type })), new BadRequestException(`${type} ${dto.name}已存在`))
    await this.metaEntity.save(this.metaEntity.create({ ...dto, type }))
  }

  async update(name: string, dto: MetaDto, type: 'tag' | 'category') {
    const meta = await this.metaEntity.findOne({ name, type })
    await this.metaEntity.save(this.metaEntity.create({ ...meta, ...dto, type }))
  }

  getCount(type: 'tag' | 'category') {
    return this.metaEntity.count({ type })
  }

  async getDetails(name: string) {
    const meta = await this.metaEntity.findOne({ name })
    const articleCount = await this.articleMetaRelationEntity.count({ where: { metaId: meta.id } })
    return { ...meta, articleCount }
  }

  getListAndArticleCount(type: 'tag' | 'category') {
    return this.metaEntity
      .createQueryBuilder('meta')
      .select(['meta.id as id', 'meta.name as name', 'meta.alias as alias', 'meta.description as description'])
      .addSelect('COUNT(relation.id)', 'articleCount')
      .leftJoin(ArticleMetaRelationEntity, 'relation', 'meta.id=relation.metaId')
      .where('meta.type=:type', { type })
      .groupBy('meta.id')
      .getRawMany()
      .then(list => list.map(item => ({ ...item, articleCount: parseInt(item.articleCount) })))
  }
}

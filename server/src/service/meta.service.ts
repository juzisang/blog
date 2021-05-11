import { MetaDto, PaginationDto } from '@app/app.dto'
import { ArticleMetaRelationEntity } from '@app/entity/article_meta_relation.entity'
import { MetaEntity } from '@app/entity/meta.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ArticleEntity } from '../entity/article.entity'

@Injectable()
export class MetaService {
  constructor(@InjectRepository(ArticleEntity) private readonly articleEntity: Repository<ArticleEntity>, @InjectRepository(MetaEntity) private readonly metaEntity: Repository<MetaEntity>) {}

  getAll(type: 'tag' | 'category') {
    return this.metaEntity.find({ type })
  }

  async save(dto: MetaDto, type: 'tag' | 'category') {
    const meta = await this.metaEntity.findOne({ name: dto.name, type })
    await this.metaEntity.save(this.metaEntity.create({ ...meta, ...dto, type }))
  }

  getCount(type: 'tag' | 'category') {
    return this.metaEntity.count({ type })
  }

  getDetails(name: string) {
    return this.metaEntity.findOne({ name })
  }

  getListAndCount(type: 'tag' | 'category') {
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

  async getArticleList(name: string, { page, pageSize }: PaginationDto) {
    page = parseInt((page || 1).toString())
    pageSize = parseInt((pageSize || 10).toString())

    const meta = await this.metaEntity.findOne({ name })
    const [list, count] = await this.articleEntity
      .createQueryBuilder('article')
      .leftJoin(ArticleMetaRelationEntity, 'relation', 'article.id=relation.articleId')
      .where('relation.meta_id=:id', { id: meta.id })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('article.id', 'DESC')
      .getManyAndCount()
    return { list, page, pageSize, count }
  }
}

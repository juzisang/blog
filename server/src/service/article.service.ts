import { ArticleDto, PaginationDto } from '@app/app.dto'
import { ArticleEntity } from '@app/entity/article.entity'
import { ArticleMetaRelationEntity } from '@app/entity/article_meta_relation.entity'
import { UserEntity } from '@app/entity/user.entity'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MetaService } from './meta.service'

export class ArticleService {
  constructor(@InjectRepository(ArticleEntity) private readonly articleEntity: Repository<ArticleEntity>, @InjectRepository(ArticleMetaRelationEntity) private readonly articleMetaRelationEntity: Repository<ArticleMetaRelationEntity>, private readonly metaService: MetaService) {}

  async getOne(id: number) {
    const article = await this.articleEntity.findOne({ id })
    article.views = article.views + 1
    await this.articleEntity.save(article)
    return this.articleEntity
      .createQueryBuilder('article')
      .leftJoinAndMapOne('article.user', UserEntity, 'user', 'article.user_id=user.id')
      .select(['user', 'article.id', 'article.title', 'article.content', 'article.description', 'article.thumb', 'article.views', 'article.utime', 'article.ctime'])
      .where('article.id=:id', { id })
      .getOne()
  }

  async getList({ page, pageSize }: PaginationDto) {
    page = parseInt((page || 1).toString())
    pageSize = parseInt((pageSize || 10).toString())
    const [list, count] = await this.articleEntity.findAndCount({ skip: (page - 1) * pageSize, take: pageSize })
    return { list, page, pageSize, count }
  }

  async save(dto: ArticleDto, user: UserEntity) {
    if (dto.id) return await this.update(dto)
    const article = await this.articleEntity.findOne({ title: dto.title })
    if (article) throw new BadRequestException('文章已存在')
    const newArticle = await this.articleEntity.save(this.articleEntity.create({ ...dto, userId: user.id, views: 0 }))
    const relations = this.articleMetaRelationEntity.create([...dto.tags, dto.category].filter(v => v).map(v => ({ articleId: newArticle.id, metaId: v })))
    await this.articleMetaRelationEntity.save(relations)
  }

  async update(dto: ArticleDto) {
    const article = await this.articleEntity.findOne(dto.id)
    if (!article) throw new NotFoundException('文章不存在')
    await this.articleMetaRelationEntity.delete({ articleId: dto.id })
    const relations = this.articleMetaRelationEntity.create([...dto.tags, dto.category].filter(v => v).map(v => ({ articleId: dto.id, metaId: v })))
    await this.articleMetaRelationEntity.save(relations)
    await this.articleEntity.save({ ...article, ...dto })
  }
}

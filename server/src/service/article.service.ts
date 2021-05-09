import { ArticleDto, PaginationDto } from '@app/app.dto'
import { ArticleEntity } from '@app/entity/article.entity'
import { ArticleMetaRelationEntity } from '@app/entity/article_meta_relation.entity'
import { UserEntity } from '@app/entity/user.entity'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MetaService } from './meta.service'
import marked from 'marked'
import highlight from 'highlight.js'

export class ArticleService {
  constructor(@InjectRepository(ArticleEntity) private readonly articleEntity: Repository<ArticleEntity>, @InjectRepository(ArticleMetaRelationEntity) private readonly articleMetaRelationEntity: Repository<ArticleMetaRelationEntity>, private readonly metaService: MetaService) {}

  async getOne(id: number) {
    const article = await this.articleEntity.findOne({ id })
    article.views = article.views + 1
    await this.articleEntity.save(article)
    return this.articleEntity.findOne({ relations: ['user'], select: ['id', 'thumb', 'title', 'utime', 'views', 'description', 'contentHtml'], where: { id } })
  }

  async getList({ page, pageSize }: PaginationDto) {
    page = parseInt((page || 1).toString())
    pageSize = parseInt((pageSize || 10).toString())
    const [list, count] = await this.articleEntity.findAndCount({ skip: (page - 1) * pageSize, take: pageSize, order: { id: 'DESC' } })
    return { list, page, pageSize, count }
  }

  async save(dto: ArticleDto, user: UserEntity) {
    if (dto.id) return await this.update(dto)
    if (await this.articleEntity.findOne({ title: dto.title })) throw new BadRequestException('文章已存在')
    const contentHtml = this.renderHtml(dto.content)
    const newArticle = await this.articleEntity.save(this.articleEntity.create({ ...dto, contentHtml, user, views: 0 }))
    const relations = this.articleMetaRelationEntity.create([...dto.tags, dto.category].filter(v => v).map(v => ({ articleId: newArticle.id, metaId: v })))
    await this.articleMetaRelationEntity.save(relations)
  }

  async update(dto: ArticleDto) {
    const article = await this.articleEntity.findOne(dto.id)
    if (!article) throw new NotFoundException('文章不存在')
    await this.articleMetaRelationEntity.delete({ articleId: dto.id })
    const relations = this.articleMetaRelationEntity.create([...dto.tags, dto.category].filter(v => v).map(v => ({ articleId: dto.id, metaId: v })))
    await this.articleMetaRelationEntity.save(relations)
    if (dto.content) {
      await this.articleEntity.save({ ...article, ...dto, contentHtml: this.renderHtml(dto.content) })
    } else {
      await this.articleEntity.save({ ...article, ...dto })
    }
  }

  renderHtml(str) {
    return marked(str, {
      highlight: function(code) {
        return highlight.highlightAuto(code).value
      },
    })
  }

  getCount() {
    return this.articleEntity.count()
  }

  getArchives() {
    return this.articleEntity
      .createQueryBuilder('article')
      .distinct()
      .select(['COUNT(article.ctime) as articleCount', `DATE_FORMAT(article.ctime,'%Y') as name`])
      .groupBy('ctime')
      .orderBy('name', 'DESC')
      .getRawMany()
  }

  getRecent() {
    return this.articleEntity.find({ order: { ctime: 'DESC' }, skip: 0, take: 4 })
  }
}

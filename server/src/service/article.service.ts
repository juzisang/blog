import { ArticleDto, IArticleFilterDto, PaginationDto } from '@app/app.dto'
import { ArticleEntity } from '@app/entity/article.entity'
import { ArticleMetaRelationEntity } from '@app/entity/article_meta_relation.entity'
import { UserEntity } from '@app/entity/user.entity'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import marked from 'marked'
import highlight from 'highlight.js'
import { MetaEntity } from '@app/entity/meta.entity'
import _ from 'lodash'

export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity) private readonly articleEntity: Repository<ArticleEntity>,
    @InjectRepository(ArticleMetaRelationEntity) private readonly articleMetaRelationEntity: Repository<ArticleMetaRelationEntity>,
    @InjectRepository(MetaEntity) private readonly metaEntity: Repository<MetaEntity>,
  ) {}

  async save(dto: ArticleDto, user: UserEntity) {
    if (await this.articleEntity.findOne({ title: dto.title })) throw new BadRequestException('文章已存在')
    const contentHtml = this.renderHtml(dto.content)
    const newArticle = await this.articleEntity.save(this.articleEntity.create({ ...dto, contentHtml, user, views: 0 }))
    const relations = this.articleMetaRelationEntity.create([...dto.tags, dto.category].filter(v => v).map(v => ({ articleId: newArticle.id, metaId: v })))
    await this.articleMetaRelationEntity.save(relations)
  }

  async update(id: string, dto: ArticleDto) {
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

  async getDetails(id: number) {
    const article = await this.articleEntity.findOne({ id })
    article.views = article.views + 1
    await this.articleEntity.save(article)
    return this.articleEntity.findOne({ relations: ['user'], select: ['id', 'thumb', 'title', 'utime', 'ctime', 'views', 'description', 'contentHtml'], where: { id } })
  }

  async getPagingList({ page, pageSize }: IArticleFilterDto) {
    page = parseInt((page || 1).toString())
    pageSize = parseInt((pageSize || 10).toString())

    const query = this.articleEntity
      .createQueryBuilder('article')
      .addSelect('article.ctime')
      .leftJoin(ArticleMetaRelationEntity, 'relation', 'article.id=relation.articleId')
      // .leftJoinAndMapMany('article.tags', MetaEntity, 'tag', `relation.meta_id=tag.id AND tag.type=:type1`, { type1: 'tag' })
      // .leftJoinAndMapOne('article.category', MetaEntity, 'category', `relation.meta_id=category.id AND category.type=:type2`, { type2: 'category' })
      .where('article.state=:state', { state: 'online' })

    // if (tag) query.andWhere('tag.name=:tag', { tag })
    // if (category) query.andWhere('category.name=:category', { category })

    const [list, count] = await query
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('article.id', 'DESC')
      .getManyAndCount()

    return { list, page, pageSize, count }
  }

  getCount() {
    return this.articleEntity.count()
  }

  getArchives() {
    return this.articleEntity
      .createQueryBuilder('article')
      .distinct()
      .select(['COUNT(article.ctime) as articleCount', `DATE_FORMAT(article.ctime,'%Y') as name`])
      .groupBy('name')
      .orderBy('name', 'DESC')
      .getRawMany()
  }

  getArchive(year: string) {
    return this.articleEntity
      .createQueryBuilder('article')
      .where('YEAR(article.ctime)=:year', { year })
      .getMany()
  }

  getRecent() {
    return this.articleEntity
      .createQueryBuilder('article')
      .addSelect('article.ctime')
      .orderBy('ctime', 'DESC')
      .skip(0)
      .take(4)
      .getMany()
  }

  private renderHtml(str) {
    return marked(str, {
      highlight: function(code) {
        return highlight.highlightAuto(code).value
      },
    })
  }
}

import { ArticleDto, PaginationDto } from '@app/app.dto'
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
  ) {}

  async getOne(id: number) {
    const article = await this.articleEntity.findOne({ id })
    article.views = article.views + 1
    await this.articleEntity.save(article)
    return this.articleEntity.findOne({ relations: ['user'], select: ['id', 'thumb', 'title', 'utime', 'ctime', 'views', 'description', 'contentHtml'], where: { id } })
  }

  async getList({ page, pageSize }: PaginationDto) {
    page = parseInt((page || 1).toString())
    pageSize = parseInt((pageSize || 10).toString())

    const [originaList, count] = await this.articleEntity
      .createQueryBuilder('article')
      .addSelect('meta.type')
      .addSelect('article.ctime')
      .leftJoin(ArticleMetaRelationEntity, 'relation', 'article.id=relation.articleId')
      .leftJoinAndMapMany('article.metas', MetaEntity, 'meta', 'relation.meta_id=meta.id')
      .where('article.state=:state', { state: 'online' })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('article.id', 'DESC')
      .getManyAndCount()

    const list = originaList.map((item: any) => {
      const excludeKeys = ['type', 'ctime', 'utime']
      const tags = item.metas.filter(v => v.type === 'tag').map(v => _.omit(v, excludeKeys))
      const findCategory = item.metas.find(v => v.type === 'category')
      const category = _.omit(findCategory, excludeKeys)
      return _.omit({ ...item, tags, category }, 'metas')
    })

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
}

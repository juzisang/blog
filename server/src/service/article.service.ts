import { ArticleDto, PaginationDto } from '@app/app.dto'
import { ArticleEntity } from '@app/entity/article.entity'
import { UserEntity } from '@app/entity/user.entity'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TagEntity } from '@app/entity/tag.entity'
import { CategoryEntity } from '@app/entity/category.entity'
import * as marked from 'marked'

export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity) private readonly articleEntity: Repository<ArticleEntity>,
    @InjectRepository(TagEntity) private readonly tagEntity: Repository<TagEntity>,
    @InjectRepository(CategoryEntity) private readonly categoryEntity: Repository<CategoryEntity>, // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getDetails(id: number) {
    await this.addViewsNumber(id)
    return this.articleEntity.findOne(id, { relations: ['user', 'tags', 'category'], select: ['title', 'description', 'content', 'thumb', 'ctime', 'utime', 'viewNumber', 'giveNumber'] }).then(res => {
      return {
        ...res,
        content: marked(res.content),
      }
    })
  }

  async getList({ page, pageSize }: PaginationDto) {
    page = parseInt((page || 1).toString())
    pageSize = parseInt((pageSize || 10).toString())
    const [list, count] = await this.articleEntity.findAndCount({ relations: ['tags', 'category'], skip: (page - 1) * pageSize, take: pageSize })
    return { list, page, pageSize, count }
  }

  async getCategoryByList(name: string, { page, pageSize }: PaginationDto) {
    page = parseInt((page || 1).toString())
    pageSize = parseInt((pageSize || 10).toString())

    const category = await this.categoryEntity.findOne({ name })

    const [list, count] = await this.articleEntity.findAndCount({ where: { category }, relations: ['tags', 'category'], skip: (page - 1) * pageSize, take: pageSize })

    return { list, page, pageSize, count }
  }

  async getTagByList(name: string, { page, pageSize }: PaginationDto) {
    page = parseInt((page || 1).toString())
    pageSize = parseInt((pageSize || 10).toString())

    const tags = await this.tagEntity.find({ name })

    const [list, count] = await this.articleEntity.findAndCount({ where: { tags }, relations: ['tags', 'category'], skip: (page - 1) * pageSize, take: pageSize })

    return { list, page, pageSize, count }
  }

  async getHotByList() {
    return this.articleEntity.find({ skip: 0, take: 5, order: { viewNumber: 'DESC' }, select: ['title', 'description', 'thumb', 'ctime', 'utime', 'viewNumber', 'giveNumber'] })
  }

  async save(dto: ArticleDto, user: UserEntity) {
    if (dto.id) return await this.update(dto)

    if (await this.articleEntity.findOne({ title: dto.title })) {
      throw new BadRequestException('文章已存在')
    }

    const tags = await this.tagEntity.findByIds(dto.tags)

    const category = await this.categoryEntity.findOne(dto.category)

    await this.articleEntity.save(
      this.articleEntity.create({
        title: dto.title,
        description: dto.description,
        content: dto.content,
        state: dto.state,
        thumb: dto.thumb,
        tags,
        category,
        user,
      }),
    )
  }

  async update(dto: ArticleDto) {
    const article = await this.articleEntity.findOne(dto.id)

    if (!article) throw new NotFoundException('文章不存在')

    const tags = await this.tagEntity.findByIds(dto.tags)

    const category = await this.categoryEntity.findOne(dto.category)

    await this.articleEntity.save(
      this.articleEntity.create({
        title: dto.title,
        description: dto.description,
        content: dto.content,
        state: dto.state,
        thumb: dto.thumb,
        tags,
        category,
      }),
    )
  }

  async addViewsNumber(id: number) {
    const article = await this.articleEntity.findOne(id)
    article.viewNumber = article.viewNumber + 1
    await this.articleEntity.save(article)
  }
}

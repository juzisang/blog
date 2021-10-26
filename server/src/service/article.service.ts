import { ArticleDto, PaginationDto } from '@app/app.dto'
import { ArticleEntity } from '@app/entity/article.entity'
import { UserEntity } from '@app/entity/user.entity'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TagEntity } from '@app/entity/tag.entity'
import { CategoryEntity } from '@app/entity/category.entity'

export class ArticleService {
  constructor(@InjectRepository(ArticleEntity) private readonly articleEntity: Repository<ArticleEntity>, @InjectRepository(TagEntity) private readonly tagEntity: Repository<TagEntity>, @InjectRepository(CategoryEntity) private readonly categoryEntity: Repository<CategoryEntity>) {}

  async getDetails(id: number) {
    return this.articleEntity.findOne(id, { relations: ['user', 'tags', 'category', 'comments'], select: ['content'] })
  }

  async addViewsNumber(id: number) {
    const article = await this.articleEntity.findOne(id)
    article.viewNumber = article.viewNumber + 1
    await this.articleEntity.save(article)
  }

  async getList({ page, pageSize }: PaginationDto) {
    page = parseInt((page || 1).toString())
    pageSize = parseInt((pageSize || 10).toString())
    const [list, count] = await this.articleEntity.findAndCount({ relations: ['tags', 'category'], skip: (page - 1) * pageSize, take: pageSize })
    return { list, page, pageSize, count }
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
}

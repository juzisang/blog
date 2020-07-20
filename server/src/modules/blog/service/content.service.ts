import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContentEntity } from "@app/modules/blog/entity/content.entity";
import { Repository } from "typeorm";
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate'
import { UserService } from "@app/modules/user/user.service";
import { ContentDto } from "../dto/content.dto";
import { TagService } from "./tag.service";
import { CategoryService } from "./category.service";

@Injectable()
export class ContentService {

  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentEntity: Repository<ContentEntity>,
    private readonly userService: UserService,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService
  ) { }

  list(type: 'article' | 'page', options: IPaginationOptions): Promise<Pagination<ContentEntity>> {
    const queryBuilder = this.contentEntity.createQueryBuilder('content')
    queryBuilder.where('content.type = :type', { type })
    queryBuilder.orderBy('content.ctime', 'DESC')
    return paginate<ContentEntity>(queryBuilder, options);
  }

  async get(title: string) {
    const content = await this.contentEntity.findOne({ title })
    if (content) {
      await this.contentEntity.update(content.id, { views: content.views + 1 })
    }
    return content
  }

  async save(type: 'article' | 'page', dto: ContentDto) {
    const { description, content, state, thumb } = dto
    const user = await this.userService.findAdmin()
    const tags = await this.tagService.pick(dto.tags)
    const category = await this.categoryService.get(dto.category)

    const entity = this.contentEntity.create({
      user,
      tags,
      category,
      type,
      description,
      content,
      state,
      thumb
    })

    await this.contentEntity.save(entity)
  }

  async update(type: 'article' | 'page', id: number, dto: ContentDto) {
    const content = await this.contentEntity.findOne({ id })

    if (!content) {
      throw new NotFoundException(`${id}不存在`)
    }

    content.user = await this.userService.findAdmin()
    content.tags = await this.tagService.pick(dto.tags)
    content.category = await this.categoryService.get(dto.category)
    content.type = type
    content.description = dto.description
    content.content = dto.content
    content.state = dto.state
    content.thumb = dto.thumb

    await this.contentEntity.update(id, content)
  }

}

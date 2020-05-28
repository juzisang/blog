import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContentEntity } from "@app/blog/entity/content.entity";
import { Repository } from "typeorm";
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate'
import { UserService } from "@app/user/user.service";
import { ContentSaveDto, ContentUpdateDto } from "../dto/content.dto";
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

  getList(options: IPaginationOptions): Promise<Pagination<ContentEntity>> {
    return paginate<ContentEntity>(this.contentEntity, options);
  }

  async save(dto: ContentSaveDto) {
    const { type, description, content, state, thumb } = dto
    const user = await this.userService.findAdmin()
    const tags = await this.tagService.getPickList(dto.tags)
    const category = await this.categoryService.getOne(dto.category)

    const entity = this.contentEntity.create({
      user,
      tags,
      category,
      type, description, content, state, thumb
    })

    await this.contentEntity.save(entity)
  }

  async update(dto: ContentUpdateDto) {
    const content = await this.contentEntity.findOne({ id: dto.id })

    if (!content) {
      throw new NotFoundException(`${dto.id}不存在`)
    }

    content.user = await this.userService.findAdmin()
    content.tags = await this.tagService.getPickList(dto.tags)
    content.category = await this.categoryService.getOne(dto.category)
    content.type = dto.type
    content.description = dto.description
    content.content = dto.content
    content.state = dto.state
    content.thumb = dto.thumb

    await this.contentEntity.update(dto.id, content)
  }
}

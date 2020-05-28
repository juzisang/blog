import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TagEntity } from "@app/blog/entity/tag.entity";
import { Repository } from "typeorm";
import { TagSaveDto, TagUpdateDto } from "../dto/TagDto";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagEntity: Repository<TagEntity>
  ) { }

  getAllList() {
    return this.tagEntity.find()
  }

  async save(dto: TagSaveDto) {
    if (await this.tagEntity.findOne({ name: dto.name })) {
      throw new BadRequestException(`${dto.name}标签已存在`)
    }
    const entity = this.tagEntity.create(dto)
    await this.tagEntity.save(entity)
  }

  async update(dto: TagUpdateDto) {
    if (!(await this.tagEntity.findOne({ id: dto.id }))) {
      throw new NotFoundException(`${dto.name}不存在`)
    }
    const entity = this.tagEntity.create(dto)
    await this.tagEntity.update(dto.id, entity)
  }
}

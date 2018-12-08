import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagEntity: Repository<TagEntity>,
  ) {}

  async findOneTag(data: { id?: number; name?: string }) {
    return await this.tagEntity.findOne({ name });
  }

  async createTag(dto: TagDto) {
    const category = await this.findOneTag({ name: dto.name });
    if (category) {
      throw new BadRequestException('标签已经存在');
    }
    return await this.tagEntity.create(dto);
  }

  async updateTag(id: number, dto: TagDto) {
    const category = await this.findOneTag({ id });
    if (!category) {
      throw new BadRequestException('标签不存在');
    }
    return await this.tagEntity.update(id, dto);
  }

  async deleteTag(id: number) {
    const category = await this.findOneTag({ id });
    if (!category) {
      throw new BadRequestException('标签不存在');
    }
    return await this.tagEntity.delete(id);
  }

  getCategorys() {
    return this.tagEntity.find();
  }
}

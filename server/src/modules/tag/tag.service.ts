import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { Repository } from 'typeorm';
import { TagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagEntity: Repository<TagEntity>,
  ) {}

  addTag(tagDto: TagDto) {
    const tag = this.tagEntity.create(tagDto);
    return this.tagEntity
      .findOne({ name: tag.name })
      .then<TagEntity>(entity => (entity ? Promise.reject(new BadRequestException(`${tag.name} 已经存在`)) : tag))
      .then(entity => this.tagEntity.save(entity));
  }

  editTag(id: number, tagDto: TagDto) {
    return this.tagEntity.findOneOrFail(id).then(() => this.tagEntity.update(id, tagDto));
  }

  getTags() {
    return this.tagEntity.find();
  }

  getTag(name: string) {
    return this.tagEntity.findOneOrFail({ name });
  }
}

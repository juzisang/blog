import { MetaDto } from '@app/app.dto'
import { TagEntity } from '@app/entity/tag.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TagService {
  constructor(@InjectRepository(TagEntity) private readonly tagEntity: Repository<TagEntity>) {}

  getAll() {
    return this.tagEntity.find()
  }

  getDetails(name: string) {
    return this.tagEntity.findOne({ name }, { relations: ['articles'] })
  }

  async save(dto: MetaDto) {
    await this.tagEntity.save(this.tagEntity.create({ ...dto }))
  }
}

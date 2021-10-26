import { MetaDto } from '@app/app.dto'
import { CategoryEntity } from '@app/entity/category.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryEntity: Repository<CategoryEntity>) {}

  getAll() {
    return this.categoryEntity.find()
  }

  getDetails(id: number) {
    return this.categoryEntity.findOne(id, { relations: ['articles'] })
  }

  async save(dto: MetaDto) {
    await this.categoryEntity.save(this.categoryEntity.create({ ...dto }))
  }
}

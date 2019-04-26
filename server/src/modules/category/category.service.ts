import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>,
  ) {}

  addCategory(dto: CategoryDto) {
    const category = this.categoryEntity.create(dto);
    return this.categoryEntity
      .findOne({ name: dto.name })
      .then<CategoryEntity>(entity => (entity ? Promise.reject(new BadRequestException(`${category.name} 已经存在`)) : category))
      .then(entity => this.categoryEntity.save(entity));
  }

  editCategory(id: number, dto: CategoryDto) {
    return this.categoryEntity.findOneOrFail(id).then(() => this.categoryEntity.update(id, dto));
  }

  getCategorys() {
    return this.categoryEntity.find();
  }

  getCategory(name: string) {
    return this.categoryEntity.findOneOrFail({ name });
  }
}

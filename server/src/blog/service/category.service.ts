import { Injectable, BadRequestException } from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>,
  ) {}

  async findOneCategory(data: { id?: number; name?: string }) {
    return await this.categoryEntity.findOne(data);
  }

  async createCategory(dto: CategoryDto) {
    const category = await this.findOneCategory({ name: dto.name });
    if (category) {
      throw new BadRequestException('分类已经存在');
    }
    return await this.categoryEntity.save(this.categoryEntity.create(dto));
  }

  async updateCategory(id: number, dto: CategoryDto) {
    const category = await this.findOneCategory({ id });
    if (!category) {
      throw new BadRequestException('分类不存在');
    }
    return await this.categoryEntity.update(id, dto);
  }

  async deleteCategory(id: number) {
    const category = await this.findOneCategory({ id });
    if (!category) {
      throw new BadRequestException('分类不存在');
    }
    return await this.categoryEntity.delete(id);
  }

  getCategorys() {
    return this.categoryEntity.find();
  }
}

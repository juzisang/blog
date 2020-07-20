import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "@app/modules/blog/entity/category.entity";
import { Repository } from "typeorm";
import { CategoryDto } from "../dto/category.dto";

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>
  ) { }

  list() {
    return this.categoryEntity.find()
  }

  get(name: string) {
    return this.categoryEntity.findOne({ name })
  }

  async save(dto: CategoryDto) {
    if (await this.categoryEntity.findOne({ name: dto.name })) {
      throw new BadRequestException(`${dto.name}分类已存在`)
    }
    const entity = this.categoryEntity.create(dto)
    await this.categoryEntity.save(entity)
  }

  async update(id: number, dto: CategoryDto) {
    if (!(await this.categoryEntity.findOne({ id }))) {
      throw new NotFoundException(`${dto.name}不存在`)
    }
    const entity = this.categoryEntity.create(dto)
    await this.categoryEntity.update(id, entity)
  }
}

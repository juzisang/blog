import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "@app/blog/entity/category.entity";
import { Repository } from "typeorm";
import { CategorySaveDto, CategoryUpdateDto } from "../dto/category.dto";

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>
  ) { }

  getAllList() {
    return this.categoryEntity.find()
  }

  getOne(name: string) {
    return this.categoryEntity.findOne({ name })
  }

  async save(dto: CategorySaveDto) {
    if (await this.categoryEntity.findOne({ name: dto.name })) {
      throw new BadRequestException(`${dto.name}分类已存在`)
    }
    const entity = this.categoryEntity.create(dto)
    await this.categoryEntity.save(entity)
  }

  async update(dto: CategoryUpdateDto) {
    if (!(await this.categoryEntity.findOne({ id: dto.id }))) {
      throw new NotFoundException(`${dto.name}不存在`)
    }
    const entity = this.categoryEntity.create(dto)
    await this.categoryEntity.update(entity.id, entity)
  }

}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/entitys/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>
  ) { }

  getList() {
    return this.categoryEntity.find()
  }

}

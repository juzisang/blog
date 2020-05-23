import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "../service/category.service";

@Controller('category')
export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService
  ) { }

  @Get()
  getList() {
    return this.categoryService.getList()
  }

}

import { Controller, Get, Body, Post, Put } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { CategorySaveDto, CategoryUpdateDto } from "../dto/CategoryDto";

@Controller('category')
export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService
  ) { }

  @Get('/list')
  getAllList() {
    return this.categoryService.getAllList()
  }

  @Get('/tree')
  getTreeList() {
    return this.categoryService.getTreeList()
  }

  @Post()
  save(@Body() dto: CategorySaveDto) {
    return this.categoryService.save(dto)
  }

  @Put()
  update(@Body() dto: CategoryUpdateDto) {
    return this.categoryService.update(dto)
  }

}

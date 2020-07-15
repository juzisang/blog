import { Controller, Get, Body, Post, Put } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { CategorySaveDto, CategoryUpdateDto } from "../dto/category.dto";
import { Auth } from "@app/common/auth.decorator";

@Controller('category')
export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService
  ) { }

  @Get('/list')
  getAllList() {
    return this.categoryService.getAllList()
  }

  @Auth()
  @Post()
  save(@Body() dto: CategorySaveDto) {
    return this.categoryService.save(dto)
  }

  @Auth()
  @Put()
  update(@Body() dto: CategoryUpdateDto) {
    return this.categoryService.update(dto)
  }

}

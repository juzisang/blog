import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/')
  addCategory(@Body() dto: CategoryDto) {
    return this.categoryService.addCategory(dto);
  }

  @Put(':id')
  editCategory(@Param('id') id: number, @Body() dto: CategoryDto) {
    return this.categoryService.editCategory(id, dto);
  }

  @Get('/list')
  getCategorys() {
    return this.categoryService.getCategorys();
  }

  @Get(':id')
  getCategory(@Param('id') id: number) {
    return this.categoryService.getCategory(id);
  }
}

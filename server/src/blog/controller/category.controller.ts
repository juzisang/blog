import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { AuthGuard } from '@nestjs/passport';
import { CategoryDto } from '../dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 返回所有分类
   */
  @Get()
  async findAll() {
    return this.categoryService.getCategorys();
  }

  /**
   * 返回分类详情
   */
  @Get(':id')
  async findOne(@Param('id') id) {
    return this.categoryService.findOneCategory({ id });
  }

  /**
   * 添加分类
   */
  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  /**
   * 更新分类
   */
  @UseGuards(AuthGuard())
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: CategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  /**
   * 删除分类
   */
  @UseGuards(AuthGuard())
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}

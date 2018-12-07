import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 返回所有分类
   */
  @Get()
  findAll() {}

  /**
   * 返回分类详情
   */
  @Get(':id')
  findOne() {}

  /**
   * 添加分类
   */
  @Post()
  create() {}

  /**
   * 更新分类
   */
  @Put(':id')
  update() {}

  /**
   * 删除分类
   */
  @Delete(':id')
  delete() {}
}

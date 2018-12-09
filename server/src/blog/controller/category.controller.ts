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
import { AuthGuard } from '@nestjs/passport';
import { CategoryDto } from '../dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor() {}

  /**
   * 返回所有分类
   */
  @Get()
  async findAll() {}

  /**
   * 返回分类详情
   */
  @Get(':id')
  async findOne(@Param('id') id) {}

  /**
   * 添加分类
   */
  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() dto: CategoryDto) {}

  /**
   * 更新分类
   */
  @UseGuards(AuthGuard())
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: CategoryDto) {}

  /**
   * 删除分类
   */
  @UseGuards(AuthGuard())
  @Delete(':id')
  async delete(@Param('id') id: number) {}
}

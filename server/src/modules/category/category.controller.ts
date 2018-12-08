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
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from 'src/common/interfaces/userpayload.interface';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 返回所有分类
   */
  @Get()
  findAll() {
    return this.categoryService.getCategorys();
  }

  /**
   * 返回分类详情
   */
  @Get(':id')
  findOne(@Param('id') id) {
    return this.categoryService.findOneCategory({ id });
  }

  /**
   * 添加分类
   */
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  /**
   * 更新分类
   */
  @UseGuards(AuthGuard())
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  /**
   * 删除分类
   */
  @UseGuards(AuthGuard())
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}

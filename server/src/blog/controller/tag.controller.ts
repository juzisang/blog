import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TagDto } from '../dto/tag.dto';

@Controller('tag')
export class TagController {
  constructor() {}

  /**
   * 返回所有标签
   */
  @Get()
  findAll() {}

  /**
   * 返回标签详情
   */
  @Get(':id')
  findOne(@Param('id') id) {}

  /**
   * 添加标签
   */
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() dto: TagDto) {}

  /**
   * 更新标签
   */
  @UseGuards(AuthGuard())
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: TagDto) {}

  /**
   * 删除标签
   */
  @UseGuards(AuthGuard())
  @Delete(':id')
  delete(@Param('id') id: number) {}
}

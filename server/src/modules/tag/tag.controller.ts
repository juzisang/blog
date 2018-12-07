import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   * 获取所有标签
   */
  @Get()
  findAll() {}

  /**
   * 返回标签详情
   */
  @Get(':id')
  findOne() {}

  /**
   * 创建标签
   */
  @Post()
  create() {}

  /**
   * 修改标签
   */
  @Put(':id')
  update() {}

  /**
   * 删除标签
   */
  @Delete(':id')
  delete() {}
}

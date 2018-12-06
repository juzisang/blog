import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * 文章列表
   */
  @Get()
  findAll() {}

  /**
   * 返回文章详情
   */
  @Get(':id')
  findOne() {}

  /**
   * 添加文章
   */
  @Post()
  create() {}

  /**
   * 更新文章
   */
  @Put(':id')
  update() {}

  /**
   * 删除文章
   */
  @Delete(':id')
  delete() {}
}

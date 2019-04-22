import { Controller, Get, Post, Put, Param } from '@nestjs/common';
import { ArticleDto } from './article.dto';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/')
  addArticle(dto: ArticleDto) {
    return this.articleService.addArticle(dto);
  }

  @Put(':id')
  editArticle(@Param('id') id: number, dto: ArticleDto) {
    return this.articleService.editArticle(id, dto);
  }

  @Get('list')
  getArticles() {}

  @Get(':id')
  getArticle() {}
}

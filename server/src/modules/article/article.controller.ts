import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ArticleDto } from './article.dto';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/')
  addArticle(@Body() dto: ArticleDto) {
    return this.articleService.addArticle(dto);
  }

  @Put(':id')
  updateArticle(@Param('id') id: number, dto: ArticleDto) {
    return this.articleService.updateArticle(id, dto);
  }

  @Get('list')
  getArticles() {
    //
  }

  @Get(':id')
  getArticle() {
    //
  }
}

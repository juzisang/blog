import { Controller, Get, Post, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ArticleDto } from './article.dto';
import { ArticleService } from './article.service';
import { PaginationDto } from '@app/common/pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard())
  addArticle(@Body() dto: ArticleDto) {
    return this.articleService.addArticle(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  updateArticle(@Param('id') id: number, @Body() dto: ArticleDto) {
    return this.articleService.updateArticle(id, dto);
  }

  @Get()
  getArticles(@Query() dto: PaginationDto) {
    return this.articleService.getArticles(dto);
  }

  @Get(':id')
  getArticle(@Param('id') id: number) {
    return this.articleService.getArticle(id);
  }
}

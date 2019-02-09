import { Controller, Get, Post, Put, Delete, UseGuards, Body, Param, Query, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';

import { ArticleService } from './article.service';
import { SaveArticleDto } from './article.dto';
import { PaginationDto } from './pagination.dto';

@ApiBearerAuth()
@ApiUseTags('article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // ADMIN

  @Post()
  @UseGuards(AuthGuard())
  createArticle(@Body() dto: SaveArticleDto) {
    return this.articleService.createArticle(dto);
  }

  @Delete('delete/:aid')
  @UseGuards(AuthGuard())
  deleteArticle(@Param('aid') aid) {
    return this.articleService.updateArticleState(aid, 'delete');
  }

  @Put(':aid')
  @UseGuards(AuthGuard())
  @ApiImplicitParam({ name: 'aid' })
  updateArticle(@Param('aid') aid, @Body() dto: SaveArticleDto) {
    return this.articleService.updateArticle(aid, dto);
  }

  @Patch('publish/:aid')
  @UseGuards(AuthGuard())
  publishArticle(@Param('aid') aid) {
    return this.articleService.updateArticleState(aid, 'online');
  }

  // PUBLIC

  @Get('list')
  getArticles(@Query('state') state, @Query() dto: PaginationDto) {
    return this.articleService.getArticles(state, dto);
  }

  @Get(':aid')
  @ApiImplicitParam({ name: 'aid' })
  getArticle(@Param('aid') aid) {
    return this.articleService.getArticle(aid);
  }
}

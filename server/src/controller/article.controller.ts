import { ArticleDto } from '@app/app.dto'
import { ArticleService } from '@app/service/article.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Query } from '@nestjs/common'

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  getArticle(@Query('id') id) {
    return this.articleService.getArticle(id)
  }

  @Auth()
  @Post()
  saveArticle(@Body() dto: ArticleDto) {
    return this.articleService.saveArticle(dto)
  }
}

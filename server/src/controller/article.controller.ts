import { ArticleDto, PaginationDto } from '@app/app.dto'
import { ArticleService } from '@app/service/article.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Req, Param, Query } from '@nestjs/common'

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  getList(@Query() pagination: PaginationDto) {
    return this.articleService.getList(pagination)
  }

  @Get('archives')
  getArchives() {
    return this.articleService.getArchives()
  }

  @Get('recent')
  getRecent() {
    return this.articleService.getRecent()
  }

  @Get(':id')
  getArticle(@Param('id') pid) {
    return this.articleService.getOne(pid)
  }

  @Auth()
  @Post()
  saveArticle(@Body() dto: ArticleDto, @Req() req) {
    return this.articleService.save(dto, req.user)
  }
}

import { ArticleDto, PaginationDto } from '@app/app.dto'
import { ArticleService } from '@app/service/article.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Req, Param, Query, Put } from '@nestjs/common'

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Auth()
  @Post()
  saveArticle(@Body() dto: ArticleDto, @Req() req) {
    return this.articleService.save(dto, req.user)
  }

  @Auth()
  @Put(':id')
  updateArticle(@Param('id') id, @Body() dto: ArticleDto) {
    return this.articleService.update(id, dto)
  }

  @Get()
  getList(@Query() pagination: PaginationDto) {
    return this.articleService.getPagingList(pagination)
  }

  @Get('recent')
  getRecent() {
    return this.articleService.getRecent()
  }

  @Get('archive')
  getArchives() {
    return this.articleService.getArchives()
  }

  @Get('archive/year/:year')
  getYearArchives(@Param('year') year: string) {
    return this.articleService.getArchive(year)
  }

  @Get(':id')
  getArticle(@Param('id') id) {
    return this.articleService.getDetails(id)
  }
}

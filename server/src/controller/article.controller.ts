import { ArticleDto, PaginationDto } from '@app/app.dto'
import { ArticleService } from '@app/service/article.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Req, Param, Query, UseInterceptors, CacheInterceptor } from '@nestjs/common'

@Controller('article')
@UseInterceptors(CacheInterceptor)
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  getList(@Query() pagination: PaginationDto) {
    return this.articleService.getList(pagination)
  }

  @Get(':id')
  getDetails(@Param('id') pid) {
    return this.articleService.getDetails(pid)
  }

  @Get('category/:name')
  getCategoryByList(@Param('name') name: string, @Query() pagination: PaginationDto) {
    return this.articleService.getCategoryByList(name, pagination)
  }

  @Get('tag/:name')
  getTagByList(@Param('name') name: string, @Query() pagination: PaginationDto) {
    return this.articleService.getTagByList(name, pagination)
  }

  @Auth()
  @Post()
  add(@Body() dto: ArticleDto, @Req() req) {
    return this.articleService.save(dto, req.user)
  }
}

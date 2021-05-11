import { MetaDto, PaginationDto } from '@app/app.dto'
import { ArticleService } from '@app/service/article.service'
import { MetaService } from '@app/service/meta.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common'

@Controller('tag')
export class TagController {
  constructor(private readonly metaService: MetaService, private readonly articleService: ArticleService) {}

  @Auth()
  @Post()
  save(@Body() tag: MetaDto) {
    return this.metaService.save(tag, 'tag')
  }

  @Get('all')
  getAll() {
    return this.metaService.getListAndCount('tag')
  }

  @Get(':name')
  getDetails(@Param('name') name: string) {
    return this.metaService.getDetails(name)
  }

  @Get(':name/list')
  getArticleList(@Param('name') name: string, @Query() pagination: PaginationDto) {
    return this.metaService.getArticleList(name, pagination)
  }
}

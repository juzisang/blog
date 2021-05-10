import { MetaDto, PaginationDto } from '@app/app.dto'
import { ArticleService } from '@app/service/article.service'
import { MetaService } from '@app/service/meta.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Put, Param, Query } from '@nestjs/common'

@Controller('tag')
export class TagController {
  constructor(private readonly metaService: MetaService, private readonly articleService: ArticleService) {}

  @Get('list')
  getAll() {
    return this.metaService.getList('tag')
  }

  @Auth()
  @Post()
  save(@Body() tag: MetaDto) {
    return this.metaService.save(tag, 'tag')
  }

  @Get(':name')
  getDetails(@Param('name') name: string, @Query() pagination: PaginationDto) {
    return this.articleService.getMetaList(name, pagination)
  }
}

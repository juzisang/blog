import { MetaDto, PaginationDto } from '@app/app.dto'
import { ArticleService } from '@app/service/article.service'
import { MetaService } from '@app/service/meta.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Param, Query, Put } from '@nestjs/common'

@Controller('tag')
export class TagController {
  constructor(private readonly metaService: MetaService, private readonly articleService: ArticleService) {}

  @Auth()
  @Post()
  save(@Body() tag: MetaDto) {
    return this.metaService.save(tag, 'tag')
  }

  @Auth()
  @Put(':name')
  update(@Param('name') name: string, @Body() category: MetaDto) {
    return this.metaService.update(name, category, 'tag')
  }

  @Get('all')
  getAll() {
    return this.metaService.getListAndArticleCount('tag')
  }

  @Get(':name')
  getTag(@Param('name') name: string) {
    return this.metaService.getDetails(name)
  }

  @Get(':name/article')
  getTagArticleList(@Param('name') name: string, @Query() pagination: PaginationDto) {
    return this.articleService.getMetaArticle(name, pagination)
  }
}

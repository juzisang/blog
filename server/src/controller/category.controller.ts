import { MetaDto, PaginationDto } from '@app/app.dto'
import { MetaService } from '@app/service/meta.service'
import { ArticleService } from '@app/service/article.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Param, Query, Put } from '@nestjs/common'

@Controller('category')
export class CategoryController {
  constructor(private readonly metaService: MetaService, private articleService: ArticleService) {}

  @Auth()
  @Post()
  save(@Body() category: MetaDto) {
    return this.metaService.save(category, 'category')
  }

  @Auth()
  @Put(':name')
  update(@Param('name') name: string, @Body() category: MetaDto) {
    return this.metaService.update(name, category, 'category')
  }

  @Get('all')
  getAll() {
    return this.metaService.getListAndArticleCount('category')
  }

  @Get(':name')
  getCategory(@Param('name') name: string) {
    return this.metaService.getDetails(name)
  }

  @Get(':name/article')
  getCategoryArticleList(@Param('name') name: string, @Query() pagination: PaginationDto) {
    return this.articleService.getMetaArticle(name, pagination)
  }
}

import { MetaDto, PaginationDto } from '@app/app.dto'
import { ArticleService } from '@app/service/article.service'
import { MetaService } from '@app/service/meta.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common'

@Controller('category')
export class CategoryController {
  constructor(private readonly metaService: MetaService, private readonly articleService: ArticleService) {}

  @Get('list')
  getAll() {
    return this.metaService.getListAndCount('category')
  }

  @Auth()
  @Post()
  save(@Body() category: MetaDto) {
    return this.metaService.save(category, 'category')
  }

  @Get(':name')
  getDetails(@Param('name') name: string, @Query() pagination: PaginationDto) {
    return this.articleService.getMetaList(name, pagination)
  }
}

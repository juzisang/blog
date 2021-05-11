import { MetaDto, PaginationDto } from '@app/app.dto'
import { MetaService } from '@app/service/meta.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common'

@Controller('category')
export class CategoryController {
  constructor(private readonly metaService: MetaService) {}

  @Auth()
  @Post()
  save(@Body() category: MetaDto) {
    return this.metaService.save(category, 'category')
  }

  @Get('all')
  getAll() {
    return this.metaService.getListAndCount('category')
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

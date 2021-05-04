import { MetaDto } from '@app/app.dto'
import { MetaService } from '@app/service/meta.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Put } from '@nestjs/common'

@Controller('category')
export class CategoryController {
  constructor(private readonly metaService: MetaService) {}

  @Get('list')
  getAll() {
    return this.metaService.getList('category')
  }

  @Auth()
  @Post()
  save(@Body() category: MetaDto) {
    return this.metaService.save(category, 'category')
  }
}

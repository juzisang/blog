import { MetaDto } from '@app/app.dto'
import { MetaService } from '@app/service/meta.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get } from '@nestjs/common'

@Controller('category')
export class CategoryController {
  constructor(private readonly metaService: MetaService) {}

  @Get('list')
  getAll() {
    return this.metaService.getMetas('category')
  }

  @Auth()
  @Post()
  save(@Body() category: MetaDto) {
    return this.metaService.saveMeta(category, 'category')
  }
}

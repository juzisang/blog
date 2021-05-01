import { MetaDto } from '@app/app.dto'
import { MetaService } from '@app/service/meta.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get } from '@nestjs/common'

@Controller('category')
export class CategoryController {
  constructor(private readonly metaService: MetaService) {}

  @Get()
  getAll() {
    return this.metaService.getMetas('tag')
  }

  @Auth()
  @Post()
  save(@Body() category: MetaDto) {
    return this.metaService.saveMeta(category, 'tag')
  }
}

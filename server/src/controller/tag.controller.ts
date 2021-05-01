import { MetaDto } from '@app/app.dto'
import { MetaService } from '@app/service/meta.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get } from '@nestjs/common'

@Controller('tags')
export class TagController {
  constructor(private readonly metaService: MetaService) {}

  @Get()
  getAll() {
    return this.metaService.getMetas('tag')
  }

  @Auth()
  @Post()
  save(@Body() tag: MetaDto) {
    return this.metaService.saveMeta(tag, 'tag')
  }
}

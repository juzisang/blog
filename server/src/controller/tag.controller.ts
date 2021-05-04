import { MetaDto } from '@app/app.dto'
import { MetaService } from '@app/service/meta.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Put } from '@nestjs/common'

@Controller('tag')
export class TagController {
  constructor(private readonly metaService: MetaService) {}

  @Get('list')
  getAll() {
    return this.metaService.getList('tag')
  }

  @Auth()
  @Post()
  save(@Body() tag: MetaDto) {
    return this.metaService.save(tag, 'tag')
  }
}

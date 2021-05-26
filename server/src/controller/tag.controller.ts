import { MetaDto } from '@app/app.dto'
import { MetaService } from '@app/service/meta.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common'

@Controller('tag')
export class TagController {
  constructor(private readonly metaService: MetaService) {}

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
}

import { MetaDto } from '@app/app.dto'
import { TagService } from '@app/service/tag.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Param } from '@nestjs/common'

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getAll() {
    return this.tagService.getAll()
  }

  @Get(':id/articles')
  getCategoryAndArticles(@Param('id') id) {
    return this.tagService.getDetails(id)
  }

  @Auth()
  @Post()
  save(@Body() tag: MetaDto) {
    return this.tagService.save(tag)
  }
}

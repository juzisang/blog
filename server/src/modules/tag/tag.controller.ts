import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TagDto } from './tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/')
  addTag(@Body() tag: TagDto) {
    return this.tagService.addTag(tag);
  }

  @Put(':id')
  editTag(@Param('id') id: number, @Body() tag: TagDto) {
    return this.tagService.editTag(id, tag);
  }

  @Get('list')
  getTags() {
    return this.tagService.getTags();
  }

  @Get(':name')
  getTag(@Param('name') name: string) {
    return this.tagService.getTag(name);
  }
}

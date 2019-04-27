import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { MetasDto } from './metas.dto';
import { MetasService } from './metas.service';

@Controller('tag')
export class TagController {
  constructor(private readonly metaService: MetasService) {}

  @Post('/')
  addTag(@Body() tag: MetasDto) {
    return this.metaService.addMeta('tag', tag);
  }

  @Put(':id')
  editTag(@Param('id') id: number, @Body() tag: MetasDto) {
    return this.metaService.updateMeta('tag', id, tag);
  }

  @Get('list')
  getTags() {
    return this.metaService.getMetas('tag');
  }

  @Get(':name')
  getTag(@Param('name') name: string) {
    return this.metaService.getMeta('tag', name);
  }
}

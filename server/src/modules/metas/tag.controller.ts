import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { MetasDto } from './metas.dto';
import { MetasService } from './metas.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tag')
export class TagController {
  constructor(private readonly metaService: MetasService) {}

  @Post()
  @UseGuards(AuthGuard())
  addTag(@Body() tag: MetasDto) {
    return this.metaService.addMeta('tag', tag);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  editTag(@Param('id') id: number, @Body() tag: MetasDto) {
    return this.metaService.updateMeta('tag', id, tag);
  }

  @Get()
  getTags() {
    return this.metaService.getMetas('tag');
  }

  @Get(':id')
  getTag(@Param('id') id: number) {
    return this.metaService.getMeta('tag', id);
  }
}

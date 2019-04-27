import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { MetasService } from './metas.service';
import { MetasDto } from './metas.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly metaService: MetasService) {}

  @Post('/')
  addCategory(@Body() dto: MetasDto) {
    return this.metaService.addMeta('category', dto);
  }

  @Put(':id')
  editCategory(@Param('id') id: number, @Body() dto: MetasDto) {
    return this.metaService.updateMeta('category', id, dto);
  }

  @Get('list')
  getCategorys() {
    return this.metaService.getMetas('category');
  }

  @Get(':name')
  getCategory(@Param('name') name: string) {
    return this.metaService.getMeta('category', name);
  }
}

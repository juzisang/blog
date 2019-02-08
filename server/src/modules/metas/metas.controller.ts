import { Controller, Get, Post, Put, Delete, UseGuards, Body, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SaveMetasDto, QueryMetasDto } from './metas.dto';
import { MetasService } from './metas.service';
import { ApiUseTags, ApiImplicitParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('metas')
@Controller('metas')
export class MetasController {
  constructor(private readonly metasService: MetasService) {}

  // ADMIN

  @Post('tag')
  @UseGuards(AuthGuard())
  createTag(@Body() dto: SaveMetasDto) {
    return this.metasService.createMeta('tag', dto);
  }

  @Post('category')
  @UseGuards(AuthGuard())
  createCategory(@Body() dto: SaveMetasDto) {
    return this.metasService.createMeta('category', dto);
  }

  @Put('tag/:mid')
  @UseGuards(AuthGuard())
  @ApiImplicitParam({ name: 'mid' })
  updateTag(@Param('mid') mid, @Body() dto: SaveMetasDto) {
    return this.metasService.updateMeta('tag', mid, dto);
  }

  @Put('category/:mid')
  @UseGuards(AuthGuard())
  @ApiImplicitParam({ name: 'mid' })
  updateCategory(@Param('mid') mid, @Body() dto: SaveMetasDto) {
    return this.metasService.updateMeta('category', mid, dto);
  }

  @Delete('tag/:mid')
  @UseGuards(AuthGuard())
  @ApiImplicitParam({ name: 'mid' })
  async deleteTag(@Param('mid') mid) {
    return this.metasService.deleteMeta('tag', mid);
  }

  @Delete('category/:mid')
  @UseGuards(AuthGuard())
  @ApiImplicitParam({ name: 'mid' })
  async deleteCategory(@Param('mid') mid) {
    return this.metasService.deleteMeta('category', mid);
  }

  // PUBLIC

  @Get('tags')
  getTags() {
    return this.metasService.getMetas('tag');
  }

  @Get('categorys')
  getCategorys() {
    return this.metasService.getMetas('category');
  }

  @Get('tag')
  getTag(@Query() body: QueryMetasDto) {
    return this.metasService.getMeta('tag', body);
  }

  @Get('category')
  getCategory(@Query() body: QueryMetasDto) {
    return this.metasService.getMeta('category', body);
  }
}

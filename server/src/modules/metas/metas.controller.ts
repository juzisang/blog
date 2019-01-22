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

  /**
   * 获取所有Tags
   */
  @Get('tags')
  findTags() {
    return this.metasService.findAll('tag');
  }

  /**
   * 获取所有分类
   */
  @Get('categorys')
  findCategorys() {
    return this.metasService.findAll('category');
  }

  /**
   * 获取 Tag 详情
   */
  @Get('tag')
  findTag(@Query() body: QueryMetasDto) {
    return this.metasService.findOne('tag', body);
  }

  /**
   * 获取分类详情
   */
  @Get('category')
  findCategory(@Query() body: QueryMetasDto) {
    return this.metasService.findOne('category', body);
  }

  /**
   * 添加 Tag
   */
  @UseGuards(AuthGuard())
  @Post('tag')
  createTag(@Body() dto: SaveMetasDto) {
    return this.metasService.create('tag', dto);
  }

  /**
   * 添加分类
   */
  @UseGuards(AuthGuard())
  @Post('category')
  createCategory(@Body() dto: SaveMetasDto) {
    return this.metasService.create('category', dto);
  }

  /**
   * 修改 Tag
   */
  @ApiImplicitParam({ name: 'mid' })
  @UseGuards(AuthGuard())
  @Put('tag/:mid')
  updateTag(@Param('mid') mid, @Body() dto: SaveMetasDto) {
    return this.metasService.update('tag', mid, dto);
  }

  /**
   * 修改分类
   */
  @ApiImplicitParam({ name: 'mid' })
  @UseGuards(AuthGuard())
  @Put('category/:mid')
  updateCategory(@Param('mid') mid, @Body() dto: SaveMetasDto) {
    return this.metasService.update('category', mid, dto);
  }

  /**
   * 删除 Tag
   */
  @ApiImplicitParam({ name: 'mid' })
  @UseGuards(AuthGuard())
  @Delete('tag/:mid')
  async deleteTag(@Param('mid') mid) {
    return this.metasService.delete('tag', mid);
  }

  /**
   * 删除分类
   */
  @ApiImplicitParam({ name: 'mid' })
  @UseGuards(AuthGuard())
  @Delete('category/:mid')
  async deleteCategory(@Param('mid') mid) {
    return this.metasService.delete('category', mid);
  }
}

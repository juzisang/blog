import { Controller, Get, Post, Put, Delete, UseGuards, Body, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMetasDto, QueryMetasDto, UpdateMetasDto, DeleteQueryMetasDto } from './metas.dto';
import { MetasService } from './metas.service';
import { ApiUseTags, ApiImplicitParam, ApiBearerAuth, ApiImplicitQuery, ApiImplicitBody } from '@nestjs/swagger';

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
  createTag(@Body() dto: CreateMetasDto) {
    return this.metasService.create('tag', dto);
  }

  /**
   * 添加分类
   */
  @UseGuards(AuthGuard())
  @Post('category')
  createCategory(@Body() dto: CreateMetasDto) {
    return this.metasService.create('category', dto);
  }

  /**
   * 修改 Tag
   */
  @UseGuards(AuthGuard())
  @Put('tag')
  updateTag(@Body() dto: UpdateMetasDto) {
    return this.metasService.update('tag', dto);
  }

  /**
   * 修改分类
   */
  @UseGuards(AuthGuard())
  @Put('category')
  updateCategory(@Body() dto: UpdateMetasDto) {
    return this.metasService.update('category', dto);
  }

  /**
   * 删除 Tag
   */
  @UseGuards(AuthGuard())
  @Delete('tag')
  async deleteTag(@Query() body: DeleteQueryMetasDto) {
    return this.metasService.delete('tag', body);
  }

  /**
   * 删除分类
   */
  @UseGuards(AuthGuard())
  @Delete('category')
  async deleteCategory(@Query() body: DeleteQueryMetasDto) {
    return this.metasService.delete('category', body);
  }
}

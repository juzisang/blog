import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { AuthGuard } from '@nestjs/passport';
import { TagDto } from './dto/tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   * 返回所有标签
   */
  @Get()
  findAll() {
    return this.tagService.getCategorys();
  }

  /**
   * 返回标签详情
   */
  @Get(':id')
  findOne(@Param('id') id) {
    return this.tagService.findOneTag({ id });
  }

  /**
   * 添加标签
   */
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() dto: TagDto) {
    return this.tagService.createTag(dto);
  }

  /**
   * 更新标签
   */
  @UseGuards(AuthGuard())
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: TagDto) {
    return this.tagService.updateTag(id, dto);
  }

  /**
   * 删除标签
   */
  @UseGuards(AuthGuard())
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tagService.deleteTag(id);
  }
}

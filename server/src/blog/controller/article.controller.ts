import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { AuthGuard } from '@nestjs/passport';
import { ArticleDto } from '../dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * 文章列表
   */
  @Get()
  findAll() {}

  /**
   * 返回文章详情
   */
  @Get(':id')
  findOne() {}

  /**
   * 添加文章
   */
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() dto: ArticleDto) {
    return this.articleService.createArticle(dto);
  }

  /**
   * 更新文章
   */
  @Put(':id')
  update() {}

  /**
   * 删除文章
   */
  @Delete(':id')
  delete() {}
}

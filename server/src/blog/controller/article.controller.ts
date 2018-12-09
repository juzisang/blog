import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { AuthGuard } from '@nestjs/passport';
import { ArticleDto } from '../dto/article.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * 文章列表
   */
  @Get()
  findAll() {
    return this.articleService.findList();
  }

  /**
   * 返回文章详情
   */
  @Get(':aid')
  findOne() {}

  /**
   * 添加文章
   */
  @UseGuards(AuthGuard())
  @Post()
  create(@User('uid') uid, @Body() dto: ArticleDto) {
    return this.articleService.createArticle(uid, dto);
  }

  /**
   * 更新文章
   */
  @UseGuards(AuthGuard())
  @Put(':aid')
  update(@Param('aid') aid, @Body() dto: ArticleDto) {
    return this.articleService.updateArticle(aid, dto);
  }

  /**
   * 删除文章
   */
  @Delete(':aid')
  delete() {}
}

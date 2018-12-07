import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * 获取评论
   */
  @Get(':id')
  findAll() {}

  /**
   * 添加评论
   */
  @Post(':id')
  create() {}

  /**
   * 修改评论
   */
  @Put(':id')
  update() {}

  /**
   * 删除评论
   */
  @Delete(':id')
  delete() {}
}

import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CommentDto } from './comment.dto';
import { CommentService } from './comment.service';
import { PaginationDto } from '@app/common/pagination.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  addComment(@Body() dto: CommentDto) {
    return this.commentService.addComment(dto);
  }

  @Get(':aid')
  getComments(@Param('aid') aid: number, @Query() pagination: PaginationDto) {
    return this.commentService.getComments(aid, pagination);
  }
}

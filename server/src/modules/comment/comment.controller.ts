import { Controller, Get, Post, Put, Delete, Param, Query, Req, Body, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CommentService } from './comment.service';
import { PaginationDto } from '../article/pagination.dto';
import { CommentDto, UpdateCommentDto } from './comment.dto';

@ApiBearerAuth()
@ApiUseTags('article')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // ADMIN

  @Put(':cid')
  @UseGuards(AuthGuard())
  updateComment(@Param('cid') cid: number, @Body() dto: UpdateCommentDto) {
    return this.commentService.updateComment(cid, dto.state);
  }

  @Delete(':cid')
  @UseGuards(AuthGuard())
  deleteComment(@Param('cid') cid: number) {
    return this.commentService.updateComment(cid, 'delete');
  }

  // PUBLIC

  @Get(':aid')
  @ApiImplicitParam({ name: 'aid' })
  getComments(@Param('aid') aid: number, @Query() dto: PaginationDto) {
    return this.commentService.getComments(aid, dto);
  }

  @Post(':aid')
  @ApiImplicitParam({ name: 'aid' })
  createComment(@Req() req, @Param('aid') aid, @Body() dto: CommentDto) {
    const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
    const agent = req.headers['user-agent'];
    return this.commentService.createComment(aid, {
      ip,
      agent,
      ...dto,
    });
  }
}

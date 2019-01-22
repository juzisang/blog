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

  /**
   * 获取评论
   */
  @ApiImplicitParam({ name: 'aid' })
  @Get(':aid')
  findAll(@Param('aid') aid: number, @Query() dto: PaginationDto) {
    return this.commentService.findList(aid, dto);
  }

  /**
   * 添加评论
   */
  @ApiImplicitParam({ name: 'aid' })
  @Post(':aid')
  create(@Req() req, @Param('aid') aid, @Body() dto: CommentDto) {
    const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
    const agent = req.headers['user-agent'];
    return this.commentService.create(aid, {
      ip,
      agent,
      ...dto,
    });
  }

  /**
   * 修改评论
   */
  @UseGuards(AuthGuard())
  @Put(':cid')
  update(@Param('cid') cid: number, @Body() dto: UpdateCommentDto) {
    return this.commentService.update(cid, dto.state);
  }

  /**
   * 删除评论
   */
  @UseGuards(AuthGuard())
  @Delete(':cid')
  delete(@Param('cid') cid: number) {
    return this.commentService.update(cid, 'delete');
  }
}

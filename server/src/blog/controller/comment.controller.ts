import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiImplicitParam,
  ApiImplicitBody,
} from '@nestjs/swagger';
import { PaginationDto } from '../dto/pagination.dto';
import { CommentDto, UpdateCommentDto } from '../dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';

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
    const ip = (
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress ||
      req.ip ||
      req.ips[0]
    ).replace('::ffff:', '');
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
  @Delete(':cid')
  delete(@Param('cid') cid: number) {
    return this.commentService.update(cid, 'delete');
  }
}

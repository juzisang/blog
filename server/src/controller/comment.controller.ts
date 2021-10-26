import { CommentDto } from '@app/app.dto'
import { CommentService } from '@app/service/comment.service'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  add(@Body() dto: CommentDto) {
    return this.commentService.add(dto)
  }
}

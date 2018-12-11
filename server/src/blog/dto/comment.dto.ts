import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CommentDto {
  @ApiModelProperty({ required: false })
  @IsOptional()
  parent: string;

  @ApiModelProperty()
  author_name: string;

  @ApiModelProperty()
  author_email: string;

  @ApiModelProperty()
  author_site: string;

  @ApiModelProperty()
  content: string;
}

export class UpdateCommentDto {
  @ApiModelProperty()
  state: string;
}

import { IsNotEmpty, IsString, IsUrl, IsIn, IsArray, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SaveArticleDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  keywords: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUrl()
  thumb: string;

  @ApiModelProperty({ type: 'string', enum: ['online', 'draft', 'delete'] })
  @IsNotEmpty()
  @IsIn(['online', 'draft', 'delete'])
  state: 'online' | 'draft' | 'delete';

  @ApiModelProperty({ type: 'number' })
  @IsNotEmpty()
  category: string;

  @ApiModelProperty({ type: 'array' })
  @IsNotEmpty()
  @IsArray()
  tags: string;
}
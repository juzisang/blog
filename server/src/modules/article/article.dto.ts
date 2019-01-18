import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsIn,
  IsArray,
  IsOptional,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateArticleDto {
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

export class UpdateArticleDto {
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  keywords: string;

  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  thumb: string;

  @ApiModelProperty({
    type: 'string',
    required: false,
    enum: ['online', 'draft', 'delete'],
  })
  @IsOptional()
  @IsNotEmpty()
  @IsIn(['online', 'draft', 'delete'])
  state: 'online' | 'draft' | 'delete';

  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  category: string;

  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  tags: string;
}

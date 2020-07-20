import { IsString, IsEnum, IsNotEmpty, IsUrl, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum ContentType {
  page = 'page',
  article = 'article'
}

export enum ContentState {
  online = 'online',
  draft = 'draft',
  delete = 'delete'
}

export class ContentDto {
  @ApiProperty({ description: '状态', enum: ['online', 'draft', 'delete'] })
  @IsEnum(ContentState)
  @IsNotEmpty()
  state: ContentState;

  @ApiProperty({ description: '标题' })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ description: '缩略图' })
  @IsUrl()
  @IsNotEmpty()
  thumb: string;

  @ApiProperty({ description: '描述' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: '标签', type: [String] })
  @IsArray()
  @IsNotEmpty()
  tags: string[]

  @ApiProperty({ description: '分类' })
  @IsString()
  @IsNotEmpty()
  category: string

  @ApiProperty({ description: '内容' })
  @IsString()
  @IsNotEmpty()
  content: string;
}

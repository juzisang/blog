import { IsString, IsEnum, IsNotEmpty, IsUrl, IsArray, IsNumber } from "class-validator";

export enum ContentType {
  page = 'page',
  article = 'article'
}

export enum ContentState {
  online = 'online',
  draft = 'draft',
  delete = 'delete'
}

export class ContentSaveDto {
  @IsEnum(ContentType)
  @IsNotEmpty()
  type: 'page' | 'article'

  @IsEnum(ContentState)
  @IsNotEmpty()
  state: 'online' | 'draft' | 'delete';

  @IsString()
  @IsNotEmpty()
  title: string

  @IsUrl()
  @IsNotEmpty()
  thumb: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  tags: string[]

  @IsString()
  @IsNotEmpty()
  category: string

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class ContentUpdateDto extends ContentSaveDto {
  @IsNumber()
  @IsNotEmpty()
  id: number
}
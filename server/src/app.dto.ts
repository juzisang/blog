import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, IsOptional, IsNumberString, IsUrl } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class OptionDto {
  @IsNotEmpty()
  @IsString()
  key: string

  @IsNotEmpty()
  @IsString()
  alias: string

  @IsOptional()
  @IsString()
  @IsNumber()
  value: string
}

export class MetaDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  alias: string

  @IsNotEmpty()
  @IsString()
  description: string
}

export class ArticleDto {
  @IsOptional()
  @IsNumber()
  id: number

  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsUrl()
  thumb: string

  @IsNotEmpty()
  @IsEnum(['online', 'draft', 'delete'])
  state: 'online' | 'draft' | 'delete'

  @IsNotEmpty()
  @IsArray()
  tags: number[]

  @IsNotEmpty()
  @IsNumber()
  category: number
}

export class PaginationDto {
  @IsOptional()
  @IsNumberString()
  page: string | number

  @IsOptional()
  @IsNumberString()
  pageSize: string | number
}

export class CommentDto {
  @IsNotEmpty()
  @IsNumber()
  articleId: number

  @IsNotEmpty()
  @IsString()
  nickname: string

  @IsNotEmpty()
  @IsString()
  mail: string

  @IsOptional()
  @IsUrl()
  siteUrl: string

  @IsNotEmpty()
  @IsString()
  content: string
}

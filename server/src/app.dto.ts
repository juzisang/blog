import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

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
  @IsString()
  thumb: string

  @IsNotEmpty()
  @IsNumber()
  views: number

  @IsNotEmpty()
  @IsEnum(['online', 'draft', 'delete'])
  state: 'online' | 'draft' | 'delete'

  @IsArray()
  tags: number[]

  @IsNumber()
  category: number
}

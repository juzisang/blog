import { IsString, IsNotEmpty, IsArray, IsNumber, IsEnum } from 'class-validator';

enum ArticleState {
  online = 'online',
  draft = 'draft',
  delete = 'delete',
}

export class ArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  keywords: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  thumb: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ArticleState)
  state: string;

  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  @IsArray()
  tags: number[];

  @IsNotEmpty()
  @IsString()
  content: string;
}

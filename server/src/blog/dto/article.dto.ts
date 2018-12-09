import { IsNotEmpty, IsString, IsUrl, IsIn, IsArray } from 'class-validator';

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
  content: string;

  @IsNotEmpty()
  @IsUrl()
  thumb: string;

  @IsNotEmpty()
  @IsIn(['online', 'draft', 'delete'])
  state: 'online' | 'draft' | 'delete';

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsArray()
  tags: string;
}

import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsIn,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateArticleDto {
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

export class UpDateArticleDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  keywords: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  thumb: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(['online', 'draft', 'delete'])
  state: 'online' | 'draft' | 'delete';

  @IsOptional()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  tags: string;
}

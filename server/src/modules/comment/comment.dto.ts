import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CommentDto {
  @IsOptional()
  @IsNumber()
  parentId;

  @IsNotEmpty()
  @IsNumber()
  aid: number;

  @IsNotEmpty()
  @IsString()
  authorName: string;

  @IsNotEmpty()
  @IsString()
  authorEmail: string;

  @IsNotEmpty()
  @IsString()
  authorSite: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  ip: string;

  @IsNotEmpty()
  @IsString()
  agent: string;
}

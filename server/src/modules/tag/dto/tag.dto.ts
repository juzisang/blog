import { IsOptional, IsString } from 'class-validator';

export class TagDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description: string;
}

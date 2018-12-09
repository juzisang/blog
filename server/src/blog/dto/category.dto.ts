import { IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  // @IsOptional()
  @IsString()
  name: string;

  // @IsOptional()
  @IsString()
  slug: string;

  // @IsOptional()
  @IsString()
  description: string;
}

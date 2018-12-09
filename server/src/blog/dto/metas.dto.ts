import { IsOptional, IsString } from 'class-validator';

export class MetasDto {
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

import { IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CategorySaveDto {
  @IsString()
  @IsOptional()
  pName: number

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  alias: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CategoryUpdateDto extends CategorySaveDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
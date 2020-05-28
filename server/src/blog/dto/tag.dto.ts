import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class TagSaveDto {
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

export class TagUpdateDto extends TagSaveDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
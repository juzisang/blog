import { IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
  @ApiProperty({ description: '分类名' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '别名' })
  @IsString()
  @IsNotEmpty()
  alias: string;

  @ApiProperty({ description: '描述' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
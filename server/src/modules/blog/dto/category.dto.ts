import { IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CategorySaveDto {
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

export class CategoryUpdateDto extends CategorySaveDto {
  @ApiProperty({ description: 'id' })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
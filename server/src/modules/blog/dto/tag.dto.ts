import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TagDto {
  @ApiProperty({ description: '标签名' })
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

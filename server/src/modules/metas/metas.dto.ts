import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * 添加分类
 */
export class SaveMetasDto {
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  slug: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  description: string;
}

/**
 * 查询分类
 */
export class QueryMetasDto {
  @ApiModelProperty({ required: false })
  @IsOptional()
  mid: number;

  @ApiModelProperty({ required: false })
  @IsOptional()
  name: string;
}

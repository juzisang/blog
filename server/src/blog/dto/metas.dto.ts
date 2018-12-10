import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class MetasDto {
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

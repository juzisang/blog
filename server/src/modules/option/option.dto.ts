import { IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class OptionDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  subTitle: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  keywords: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

import { IsString, IsNotEmpty, IsUrl, IsEmail } from 'class-validator';
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

  @ApiModelProperty()
  @IsUrl()
  @IsNotEmpty()
  site_url: string;

  @ApiModelProperty()
  @IsEmail()
  @IsNotEmpty()
  site_email: string;
}

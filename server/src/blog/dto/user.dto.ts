import {
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  group: string;
}

export class UpdateUserDto {
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiModelProperty({ required: false })
  @ApiModelProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiModelProperty({ required: false })
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  slogan: string;

  @ApiModelProperty({ required: false })
  @ApiModelProperty()
  @IsOptional()
  @IsUrl()
  avatar: string;

  @ApiModelProperty({ required: false })
  @ApiModelProperty()
  @IsOptional()
  @IsUrl()
  url: string;
}

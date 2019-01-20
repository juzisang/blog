import { MinLength, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * 创建用户
 */
export class CreateUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

/**
 * 更新用户
 */
export class UpdateUserDto {
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

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
}

/**
 * 修改密码
 */
export class UpdatePasswordDto {
  @ApiModelProperty()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(6)
  oldPassword: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}

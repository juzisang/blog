import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * 登录
 */
export class LoginUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password: string;
}

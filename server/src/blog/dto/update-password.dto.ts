import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

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

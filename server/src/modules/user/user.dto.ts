import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({ description: '密码' })
  @IsNotEmpty()
  @IsString()
  password?: string;
}

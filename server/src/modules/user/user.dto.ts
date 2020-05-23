import { IsString, IsNotEmpty } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string
  
  @IsNotEmpty()
  @IsString()
  password: string;
}

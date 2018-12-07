import { IsUrl, IsEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmpty()
  name: string;

  @MinLength(6)
  @IsEmpty()
  password: string;

  @IsEmail()
  @IsEmpty()
  email: string;
}

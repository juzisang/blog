import { IsString, IsUrl, IsEmail, IsOptional, IsEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  slogan: string;

  @IsOptional()
  @IsUrl()
  avatar: string;
}

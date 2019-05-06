import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  slogan: string;

  @IsOptional()
  @IsString()
  avatar: string;
}

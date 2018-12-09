import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class OptionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subTitle: string;

  @IsString()
  @IsNotEmpty()
  keywords: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

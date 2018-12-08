import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class OptionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  sub_title: string;

  @IsString()
  @IsNotEmpty()
  keywords: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  site_url: string;
}

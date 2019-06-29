import { IsNotEmpty } from 'class-validator';

export class ConfigDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  keywords: string;

  @IsNotEmpty()
  logo: string;
}

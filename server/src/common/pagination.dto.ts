import { IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  size: number;
}

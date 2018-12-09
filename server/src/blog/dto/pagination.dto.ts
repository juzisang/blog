import { IsInt } from 'class-validator';

export class PaginationDto {
  size: number;

  index: number = 1;
}

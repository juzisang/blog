import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @ApiModelProperty()
  @IsNotEmpty()
  size: number;

  @IsNotEmpty()
  @ApiModelProperty()
  index: number = 1;
}

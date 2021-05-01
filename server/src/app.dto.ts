import { IsNotEmpty, IsString } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class OptionDto {
  @IsNotEmpty()
  @IsString()
  key: string

  @IsNotEmpty()
  @IsString()
  alias: string

  value: string
}

export class MetaDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  alias: string

  @IsNotEmpty()
  @IsString()
  description: string
}

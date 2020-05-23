import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login(userDto: UserDto) {
    const isValidate = await this.userService.validate(userDto)
    if (!isValidate) {
      throw new UnauthorizedException()
    }

    const user = await this.userService.findOne({ username: userDto.username })
    return await this.jwtService.sign({
      id: user.id,
      username: user.username
    })
  }

  async validate(id: number) {
    const user = await this.userService.findOne({ id })
    return !!user
  }
}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@app/modules/user/user.entity";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import { MD5 } from 'crypto-js'
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {

  private admin: UserEntity

  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {
  }

  findOne({ id, username }: { id?: number, username?: string }) {
    return username
      ? this.userEntity.findOne({ username })
      : this.userEntity.findOne({ id })
  }

  async findAdmin() {
    if (!this.admin) {
      this.admin = await this.userEntity.findOne({ username: process.env.USER_ROOT_NAME })
    }
    return this.admin
  }

  async validate(userDto: UserDto) {
    const user = await this.userEntity.findOne({ username: userDto.username })
    if (!user) {
      return false
    }
    if (user.password === user.password) {
      return true
    }
    return false
  }

  async create(userDto: UserDto) {
    await this.userEntity.save({
      ...userDto,
      password: MD5(userDto.password).toString()
    })
  }

  async login(userDto: UserDto) {
    const isValidate = await this.validate(userDto)
    if (!isValidate) {
      throw new UnauthorizedException()
    }

    const user = await this.findOne({ username: userDto.username })
    return await this.jwtService.sign({
      id: user.id,
      username: user.username
    })
  }

  async validateUser(id: number) {
    const user = await this.findOne({ id })
    return !!user
  }

}

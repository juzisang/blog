import { UserDto } from '@app/app.dto'
import { UserEntity } from '@app/entity/user.entity'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { config } from '@app/app.config'
import { MD5, enc } from 'crypto-js'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async initAdmin() {
    const user = await this.userEntity.findOne({ username: config.USER_ADMIN_NAME })
    if (!user) {
      await this.register({ username: config.USER_ADMIN_NAME, password: config.USER_ADMIN_PASSWORD })
    }
  }

  public getUser(id: number) {
    return this.userEntity.findOneOrFail({ id })
  }

  public async login(userDto: UserDto) {
    const user = await this.userEntity.findOne({ username: userDto.username })
    if (!user) {
      throw new UnauthorizedException('用户不存在')
    }
    if (userDto.password === user.password) {
      throw new UnauthorizedException()
    }
    return { token: await this.jwtService.sign({ id: user.id }) }
  }

  public async register(userDto: UserDto) {
    if (await this.userEntity.findOne(userDto.username)) {
      throw new BadRequestException('用户已存在')
    }
    await this.userEntity.save(
      this.userEntity.create({
        ...userDto,
        password: this.encryptionPassword(userDto.password),
      }),
    )
  }

  private encryptionPassword(pwd: string) {
    return enc.Hex.stringify(MD5(pwd))
  }
}

import { UserDto } from '@app/app.dto'
import { UserEntity } from '@app/entity/user.entity'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { config } from '@app/app.config'
import { MD5, enc } from 'crypto-js'
import assert from 'assert'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async initAdmin() {
    const user = await this.userEntity.findOne({ username: config.USER_ADMIN_NAME })
    if (user) return
    await this.register({ username: config.USER_ADMIN_NAME, password: config.USER_ADMIN_PASSWORD }, { authorName: config.AUTHOR_NAME }, 'master')
  }

  public getUser(id: number) {
    assert.ok(id, new UnauthorizedException('请先登录'))
    return this.userEntity.findOneOrFail({ id })
  }

  public getUserInfo() {
    return this.userEntity.findOne({ select: ['slogan', 'url', 'authorName', 'avatar'] })
  }

  public async login(userDto: UserDto) {
    const user = await this.userEntity.findOne({ where: { username: userDto.username }, select: ['password', 'username', 'id'] })
    const encodePwd = this.encryptionPassword(userDto.password)
    assert.ok(user, new UnauthorizedException('用户不存在'))
    assert.strictEqual(encodePwd, user.password, new UnauthorizedException('密码不正确'))
    return { token: await this.jwtService.sign({ id: user.id }) }
  }

  public async register(userDto: UserDto, extra: { authorName?: string }, type: 'master' | 'follower' = 'follower') {
    const user = await this.userEntity.findOne(userDto.username)
    assert.ok(!user, new BadRequestException('用户已存在'))
    await this.userEntity.save(this.userEntity.create({ ...userDto, ...extra, type, password: this.encryptionPassword(userDto.password) }))
  }

  private encryptionPassword(pwd: string) {
    return enc.Hex.stringify(MD5(pwd))
  }
}

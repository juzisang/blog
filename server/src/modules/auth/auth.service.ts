import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AuthDto } from './auth.dto';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AuthEntity)
    private readonly authEntity: Repository<AuthEntity>,
  ) {}

  signIn(dto: AuthDto) {
    return this.authEntity.findOneOrFail({ username: dto.username }).then(entity => {
      if (entity.password !== this.encryptPwd(dto.password)) {
        throw new BadRequestException('密码不正确');
      }
      const user: JwtPayload = { id: entity.id };
      return this.jwtService.sign(user);
    });
  }

  register(dto: AuthDto) {
    return this.authEntity.findOneOrFail({ username: dto.username }).then(
      () => {
        return Promise.reject(new BadRequestException('用户已存在'));
      },
      () => {
        return this.authEntity.save(this.authEntity.create({ ...dto, password: this.encryptPwd(dto.password) }));
      },
    );
  }

  getAdminInfo() {
    return this.authEntity.findOneOrFail({ username: 'root' });
  }

  createAdmin() {
    return this.register({
      username: 'root',
      password: '123456',
      slogan: ' ',
      avatar: ' ',
    });
  }

  validateUser(payload: JwtPayload) {
    return this.authEntity.findOneOrFail(payload.id);
  }

  private encryptPwd(str: string) {
    return createHash('md5')
      .update(str)
      .digest('hex');
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserPayload } from '@app/interfaces/userpayload.interface';
import { encryptPwd } from '@app/utils/util';

import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  createToken(user: UserPayload) {
    return this.jwtService.sign(user);
  }

  async validateUser(uid) {
    return await this.userRepository.findOne(uid);
  }

  async loginUser(dto: LoginUserDto) {
    const user = await this.userRepository.findOne({ name: dto.name });
    if (!user) {
      throw new NotFoundException('用户名或密码错误');
    }
    if (user.password !== encryptPwd(dto.password)) {
      throw new NotFoundException('用户名或密码错误');
    }
    return this.createToken({
      uid: user.uid,
    });
  }
}

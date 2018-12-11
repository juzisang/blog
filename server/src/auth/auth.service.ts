import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../common/interfaces/userpayload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../blog/entity/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseData } from 'src/common/utils/response.data';
import { encryptPwd } from 'src/common/utils/util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 新建Token
   */
  createToken(user: UserPayload) {
    return this.jwtService.sign(user);
  }

  /**
   * 判断用户是否存在
   * @param name
   */
  async validateUser(uid) {
    return await this.userRepository.findOne(uid);
  }

  /**
   * 登录
   */
  async loginUser(dto: LoginUserDto) {
    const user = await this.userRepository.findOne({ name: dto.name });
    if (!user) {
      throw new NotFoundException('用户名或密码错误');
    }
    if (user.password !== encryptPwd(dto.password)) {
      throw new NotFoundException('用户名或密码错误');
    }
    const token = this.createToken({
      uid: user.uid,
    });
    const data = {
      ...user,
      token,
    };
    delete data.password;
    return data;
  }
}

import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../common/interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { createHash } from 'crypto';
import { ResponseData } from 'src/common/utils/response.data';

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
  createToken(user: User) {
    return this.jwtService.sign(user);
  }

  /**
   * 判断用户是否存在
   * @param name
   */
  async validateUser(name: string) {
    return await this.userRepository.findOne({ name });
  }

  /**
   * 登录
   */
  async loginUser(dto: LoginUserDto) {
    const user = await this.validateUser(dto.name);
    if (!user) {
      throw new NotFoundException('用户名或密码错误');
    }
    if (
      user.password !==
      createHash('md5')
        .update(dto.password)
        .digest('hex')
    ) {
      throw new NotFoundException('用户名或密码错误');
    }
    const token = this.createToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    return new ResponseData({ ...user, token });
  }
}

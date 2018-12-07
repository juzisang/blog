import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../../common/interfaces/userpayload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
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
  async validateUser(data: { name?: string; id?: number }) {
    return await this.userRepository.findOne(data);
  }

  /**
   * 登录
   */
  async loginUser(dto: LoginUserDto) {
    const user = await this.validateUser({ name: dto.name });
    if (!user) {
      throw new NotFoundException('用户名或密码错误');
    }
    if (user.password !== encryptPwd(dto.password)) {
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

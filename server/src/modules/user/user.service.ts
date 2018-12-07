import {
  Injectable,
  HttpCode,
  HttpStatus,
  ForbiddenException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 创建用户
   * @param dto
   */
  async createdUser(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({ name: dto.name });
    if (user) {
      throw new ForbiddenException('用户已存在');
    }
    return await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password: createHash('md5')
          .update(dto.password)
          .digest('hex'),
      }),
    );
  }

  async findOneUser(name: string) {
    return await this.userRepository.findOne({ name });
  }
}

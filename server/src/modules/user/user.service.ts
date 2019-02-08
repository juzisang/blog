import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { encryptPwd } from '@app/utils/util';

import { UserEntity } from './user.entity';
import { CreateUserDto, UpdateUserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async IsEmptyUsers() {
    return (await this.userRepository.count()) === 0;
  }

  async getAdmin() {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      throw new Error('用户不存在');
    }
    return users[0];
  }

  async createdAdmin(dto: CreateUserDto) {
    if (this.IsEmptyUsers()) {
      return await this.userRepository.save(
        this.userRepository.create({
          ...dto,
          password: encryptPwd(dto.password),
        }),
      );
    }
    throw new BadRequestException('用户已存在');
  }

  async updateAdmin(date: UpdateUserDto) {
    const { uid } = await this.getAdmin();
    return await this.userRepository.update(uid, {
      name: date.name,
      avatar: date.avatar,
      slogan: date.slogan,
    });
  }

  async updateAdminPwd(dto: UpdatePasswordDto) {
    const { password, uid } = await this.getAdmin();
    if (password !== encryptPwd(dto.oldPassword)) {
      throw new BadRequestException('密码错误');
    }
    if (password === encryptPwd(dto.newPassword)) {
      throw new BadRequestException('新旧密码不能一样');
    }
    await this.userRepository.update(uid, { password: encryptPwd(dto.newPassword) });
  }
}

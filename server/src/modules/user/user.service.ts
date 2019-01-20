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

  /**
   * 判断用户是否为空
   */
  async IsEmptyUsers() {
    return (await this.userRepository.count()) === 0;
  }

  /**
   * 获取root用户
   */
  async findRoot() {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      throw new Error('用户不存在');
    }
    return users[0];
  }

  /**
   * 新建root用户
   */
  async created(dto: CreateUserDto) {
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

  /**
   * 更新用户数据
   */
  async update(date: UpdateUserDto) {
    const { uid } = await this.findRoot();
    return await this.userRepository.update(uid, {
      name: date.name,
      avatar: date.avatar,
      slogan: date.slogan,
    });
  }

  /**
   * 修改密码
   */
  async updatePwd(dto: UpdatePasswordDto) {
    const { password, uid } = await this.findRoot();
    if (password !== encryptPwd(dto.oldPassword)) {
      throw new BadRequestException('密码错误');
    }
    if (password === encryptPwd(dto.newPassword)) {
      throw new BadRequestException('新旧密码不能一样');
    }
    return await this.userRepository.update(uid, { password: encryptPwd(dto.newPassword) });
  }
}

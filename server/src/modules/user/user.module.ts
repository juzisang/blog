import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DEFAULT_DATA } from '@app/app.config';

import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    await this.createDefaultUser();
  }

  /**
   * 创建默认用户
   */
  async createDefaultUser() {
    if (await this.userService.IsEmptyUsers()) {
      await this.userService.created({
        name: DEFAULT_DATA.user.name,
        password: DEFAULT_DATA.user.password,
      });
    }
  }
}

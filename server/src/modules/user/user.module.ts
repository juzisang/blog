import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { DEFAULT_DATA } from '../../app.config';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  onModuleInit() {
    this.createDefaultUser();
  }

  /**
   * 创建默认用户
   */
  async createDefaultUser() {
    if (await this.userService.IsEmptyUsers()) {
      await this.userService.createdUser({
        name: DEFAULT_DATA.user.name,
        email: DEFAULT_DATA.user.email,
        password: DEFAULT_DATA.user.password,
      });
    }
  }
}

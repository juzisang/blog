import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements OnModuleInit {
  onModuleInit() {
    this.createDefaultUser();
  }

  /**
   * 创建默认用户
   */
  createDefaultUser() {}
}

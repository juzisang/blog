import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@app/modules/user/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: 3600 },
      })
    })],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService]
})
export class UserModule implements OnModuleInit {

  constructor(
    private readonly userService: UserService
  ) { }

  async onModuleInit() {
    // 创建管理员用户
    const rootUser = await this.userService.findOne({ username: process.env.USER_ROOT_NAME })
    if (!rootUser) {
      await this.userService.create({
        username: process.env.USER_ROOT_NAME,
        password: process.env.USER_ROOT_PASSWORD
      })
    }
  }
}
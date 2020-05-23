import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entitys/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule implements OnModuleInit {

  constructor(
    private readonly userService: UserService
  ) { }

  async onModuleInit() {
    const rootUser = await this.userService.findOne({ username: process.env.USER_ROOT_NAME })
    if (!rootUser) {
      await this.userService.create({
        username: process.env.USER_ROOT_NAME,
        password: process.env.USER_ROOT_PASSWORD
      })
    }
  }
}
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getHello(): { message: string } {
    return {
      message: '欢迎使用橘子的Blog https://www.juzisang.top/',
    }
  }
}

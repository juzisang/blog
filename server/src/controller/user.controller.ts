import { UserDto } from '@app/app.dto'
import { ArticleService } from '@app/service/article.service'
import { MetaService } from '@app/service/meta.service'
import { UserService } from '@app/service/user.service'
import { Controller, Post, Body, Get } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly metaService: MetaService, private readonly articleService: ArticleService) {}

  @Post('login')
  login(@Body() userDto: UserDto) {
    return this.userService.login(userDto)
  }

  @Get('/info')
  async getAuthorInfo() {
    return {
      info: await this.userService.getUserInfo(),
      tagCount: await this.metaService.getCount('tag'),
      categoryCount: await this.metaService.getCount('category'),
      articleCount: await this.articleService.getCount(),
    }
  }
}

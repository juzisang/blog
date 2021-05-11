import { ArticleService } from '@app/service/article.service'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('archive')
export class ArchiveController {
  constructor(private articleService: ArticleService) {}

  @Get('all')
  getArchiveList() {
    return this.articleService.getArchives()
  }

  @Get(':year')
  getArchive(@Param('year') year: string) {
    return this.articleService.getArchive(year)
  }
}

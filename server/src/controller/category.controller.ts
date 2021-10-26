import { MetaDto } from '@app/app.dto'
import { CategoryService } from '@app/service/category.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Param } from '@nestjs/common'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getAll()
  }

  @Get(':id/articles')
  getCategoryAndArticles(@Param('id') id) {
    return this.categoryService.getDetails(id)
  }

  @Auth()
  @Post()
  save(@Body() category: MetaDto) {
    return this.categoryService.save(category)
  }
}

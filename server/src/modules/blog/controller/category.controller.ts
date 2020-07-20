import { Controller, Get, Body, Post, Put, Param } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { CategorySaveDto, CategoryUpdateDto } from "../dto/category.dto";
import { Auth } from "@app/common/auth.decorator";
import { ApiTags, ApiParam, ApiOkResponse, ApiBearerAuth } from "@nestjs/swagger";
import { CategoryEntity } from "../entity/category.entity";

@ApiTags('category')
@Controller('category')
export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService
  ) { }

  @ApiOkResponse({ isArray: true, type: [CategoryEntity], description: '分类列表' })
  @Get()
  list() {
    return this.categoryService.getAllList()
  }

  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiOkResponse({ type: CategoryEntity, description: '分类详情' })
  @Get(':id')
  one(@Param('id') id: string) {
    return id
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: CategoryEntity, description: '保存分类' })
  @Auth()
  @Post()
  save(@Body() dto: CategorySaveDto) {
    return this.categoryService.save(dto)
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: CategoryEntity, description: '更新分类' })
  @Auth()
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CategoryUpdateDto) {
    return this.categoryService.update(dto)
  }
}

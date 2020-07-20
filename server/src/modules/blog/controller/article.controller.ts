import { Controller, Get, Query, Body, Post, Put, Param } from "@nestjs/common";
import { ContentService } from "../service/content.service";
import { ContentDto } from "../dto/content.dto";
import { Auth } from "@app/common/auth.decorator";
import { ApiTags, ApiQuery, ApiOkResponse, ApiParam, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { ContentEntity } from "../entity/content.entity";

@ApiTags('article')
@Controller('article')
export class ArticleController {

  constructor(
    private readonly contentService: ContentService
  ) { }

  @ApiQuery({ name: 'page', description: '页码' })
  @ApiQuery({ name: 'limit', description: '数量' })
  @ApiOkResponse({ type: ContentEntity, isArray: true, description: '文章列表' })
  @Get()
  list(@Query('page') page = 0, @Query('limit') limit = 10) {
    limit = limit > 100 ? 100 : limit;
    return this.contentService.list('article', {
      page,
      limit
    });
  }

  @ApiParam({ name: 'id', description: '文章ID' })
  @Get(':id')
  get(@Param('id') id: number) {
    return this.contentService.get({ id })
  }

  @ApiBearerAuth()
  @ApiBody({ type: ContentDto })
  @ApiOkResponse({ type: ContentEntity, description: '保存文章' })
  @Auth()
  @Post()
  save(@Body() dto: ContentDto) {
    return this.contentService.save('article', dto)
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: '文章ID' })
  @ApiOkResponse({ type: ContentEntity, description: '更新文章' })
  @Auth()
  @Put(':id')
  update(id: number, @Body() dto: ContentDto) {
    return this.contentService.update('article', id, dto)
  }
}

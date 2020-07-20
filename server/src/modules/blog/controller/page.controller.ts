import { Controller, Get, Query, Body, Post, Put, Param } from "@nestjs/common";
import { ContentService } from "../service/content.service";
import { ContentDto } from "../dto/content.dto";
import { Auth } from "@app/common/auth.decorator";
import { ApiTags, ApiQuery, ApiOkResponse, ApiParam, ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { ContentEntity } from "../entity/content.entity";

@ApiTags('page')
@Controller('page')
export class PageController {

  constructor(
    private readonly contentService: ContentService
  ) { }

  @ApiQuery({ name: 'page', description: '页码' })
  @ApiQuery({ name: 'limit', description: '数量' })
  @ApiOkResponse({ type: ContentEntity, description: '页面列表' })
  @Get()
  list(@Query('page') page = 1, @Query('limit') limit = 10) {
    limit = limit > 100 ? 100 : limit;
    return this.contentService.list('page', {
      page,
      limit
    });
  }

  @ApiParam({ name: 'title', description: '标题' })
  @Get(':title')
  get(@Param('title') title: string) {
    return this.contentService.get({ title })
  }

  @ApiBearerAuth()
  @ApiBody({ type: ContentDto })
  @ApiOkResponse({ type: ContentEntity, description: '保存文章' })
  @Auth()
  @Post()
  save(@Body() dto: ContentDto) {
    return this.contentService.save('page', dto)
  }

  @ApiBearerAuth()
  @ApiBody({ type: ContentDto })
  @ApiOkResponse({ type: ContentEntity, description: '保存文章' })
  @Auth()
  @Put(':id')
  update(id: number, @Body() dto: ContentDto) {
    return this.contentService.update('page', id, dto)
  }
}

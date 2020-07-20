import { Controller, Body, Post, Get, Put, Param } from "@nestjs/common";
import { TagService } from "../service/tag.service";
import { TagDto } from "../dto/tag.dto";
import { Auth } from "@app/common/auth.decorator";
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { TagEntity } from "../entity/tag.entity";

@ApiTags('tag')
@Controller('tag')
export class TagController {

  constructor(
    private readonly tagService: TagService
  ) { }

  @ApiOkResponse({ type: TagEntity, isArray: true, description: '标签列表' })
  @Get()
  list() {
    return this.tagService.list()
  }

  @ApiParam({ name: 'name' })
  @ApiOkResponse({ type: TagEntity, description: '标签详情' })
  @Get(':name')
  one(@Param('name') name: string) {
    return this.tagService.get(name)
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: TagEntity, description: '保存标签' })
  @Auth()
  @Post()
  save(@Body() dto: TagDto) {
    return this.tagService.save(dto)
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: TagEntity, description: '更新标签' })
  @Auth()
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: TagDto) {
    return this.tagService.update(id, dto)
  }
}

import { Controller, Post, UseInterceptors, UploadedFile, FileInterceptor, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiImplicitFile } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import * as path from 'path';
import { APP } from '@app/app.config';

@ApiBearerAuth()
@ApiUseTags('helper')
@Controller('helper')
export class HelperController {
  @UseGuards(AuthGuard())
  @ApiImplicitFile({ name: 'file' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return path.join(APP.origin, 'files', file.filename);
  }
}

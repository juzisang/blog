import { Module, MulterModule } from '@nestjs/common';
import { HelperController } from './helper.controller';
import { MulterConfigService } from './multer.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [HelperController],
  providers: [],
})
export class HelperModule {}

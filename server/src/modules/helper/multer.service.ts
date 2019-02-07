import { Injectable, MulterOptionsFactory, MulterModuleOptions } from '@nestjs/common';
import { APP } from '@app/app.config';
import * as multer from 'multer';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, APP.uploadPath);
        },
        filename(req, file, cb) {
          crypto.pseudoRandomBytes(16, (err, raw) => {
            cb(null, raw.toString('hex') + path.extname(file.originalname));
          });
        },
      }),
    };
  }
}

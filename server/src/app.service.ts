import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return '喵喵喵？';
  }
}

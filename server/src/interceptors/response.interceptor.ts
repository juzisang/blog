import { NestInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    return call$.pipe(map(data => new ResponseData(data)));
  }
}

export class ResponseData {
  body?: any;
  statusCode: number;
  message: string;

  constructor(body: any, statusCode?: number, message?: string) {
    this.statusCode = statusCode || 200;
    this.message = message || this.statusCode === 200 ? 'ok' : 'error';
    if (body) {
      this.body = body;
    }
  }
}

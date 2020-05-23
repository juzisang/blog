import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum IHttpStatus {
  Error = 'error',
  Success = 'success',
}

export interface IHttpResponse<T> {
  status: IHttpStatus;
  message: string;
  data?: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<IHttpResponse<T>> {
    return next.handle()
      .pipe(map(data => this.transformResponse(data)))
  }

  transformResponse(data: any) {
    return {
      status: IHttpStatus.Success,
      message: 'ok',
      data: data ? data : undefined,
    };
  }
}
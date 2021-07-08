import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IHttpResponse<T> {
  statusCode: number
  message: string
  data?: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<IHttpResponse<T>> {
    return next.handle().pipe(map(data => this.transformResponse(data)))
  }

  transformResponse(data: any) {
    return {
      statusCode: 200,
      message: 'ok',
      data: data ? data : undefined,
    }
  }
}

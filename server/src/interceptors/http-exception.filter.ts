import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { isDev } from '@app/app.env';

import { IHttpStatus } from '@app/interfaces/http.interface';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = typeof exception.message === 'object' ? exception.message.error : exception.message;
    response.status(status).json({
      status: IHttpStatus.Error,
      message,
    });
    if (isDev) {
      // 加这个是为了，开发环境，遇到错误会在控制台打印
      throw exception;
    }
  }
}

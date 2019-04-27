import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { isDev } from '@app/app.env';

import { IHttpResponse, IHttpStatus } from '@app/interfaces/http.interface';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;
    const data: IHttpResponse<any> = {
      status: IHttpStatus.Error,
      message,
    };
    response.status(status).json(data);
    if (isDev) {
      throw exception;
    }
  }
}

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

import { IHttpStatus } from './transform.interceptor';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      status: IHttpStatus.Error,
      message: exception.message,
    });
  }
}
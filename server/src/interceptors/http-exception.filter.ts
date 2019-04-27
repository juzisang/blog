import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { isDev } from '@app/app.env';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        code: status,
        message: exception.message,
      });
    } else if (exception instanceof Error) {
      response.status(500).json({
        code: 500,
        message: exception.message,
      });
      if (isDev) {
        throw exception;
      }
    }
  }
}

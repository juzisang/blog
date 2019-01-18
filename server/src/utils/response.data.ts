export class ResponseData {
  body: any;
  statusCode: number;
  message: string;

  constructor(body: any, statusCode?: number, message?: string) {
    this.statusCode = statusCode || 200;
    this.message = message || this.statusCode === 200 ? 'ok' : 'error';
    this.body = body;
  }
}

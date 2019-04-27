export interface IHttpResponse<T> {
  code: number;
  message: string;
  data?: T;
}

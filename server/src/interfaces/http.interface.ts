export enum IHttpStatus {
  Error = 'error',
  Success = 'success',
}

export interface IHttpResponse<T> {
  status: IHttpStatus;
  message: string;
  data?: T;
}

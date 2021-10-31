export interface IResponseData<T> {
  statusCode: number
  message: string
  data: T
}

export const baseURL = 'http://127.0.0.1:9000'

type UseFetch = typeof import('nuxt3/dist/app')['useFetch']

export function ResponseDataTransform<T>(data: IResponseData<T>): any {
  return data.data
}

export default function useData<T>(url: string, options?: Parameters<UseFetch>[1]) {
  return useFetch<string, IResponseData<T>>(url, { ...options as any, baseURL, transform: ResponseDataTransform })
}


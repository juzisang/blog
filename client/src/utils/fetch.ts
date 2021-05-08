import axios, { AxiosRequestConfig } from 'axios'

const ajax = axios.create({
  baseURL: process.browser ? BLOG_API : SERVER_BLOG_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 30 * 1000,
})

export function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return ajax.get(url, config).then((res) => handleData(res))
}

export function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return ajax.post(url, data, config).then((res) => handleData(res))
}

function handleData(res) {
  if (res?.data?.statusCode === 200) {
    return res.data.data
  }
  throw new Error(res?.data?.message)
}

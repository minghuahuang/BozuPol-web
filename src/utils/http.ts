import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const defaultConfig = {
  timeout: 5000,
  baseURL: import.meta.env.PROD ? 'https://yl-web.wkbins.com' : 'https://testyl-web.wkbins.com',
}

class Http {
  constructor() {
    this.httpInterceptorRequest()
    this.httpInterceptorResponse()
  }

  private static axioxInstance = axios.create(defaultConfig)

  private httpInterceptorRequest() {
    Http.axioxInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config
    }, err => {
      return Promise.reject(err)
    })
  }

  private httpInterceptorResponse() {
    Http.axioxInstance.interceptors.response.use((response: AxiosResponse) => {
      return response
    }, err => {
      return Promise.reject(err)
    })
  }

  public httpGet<T>(url:string, params: AxiosRequestConfig):Promise<T> {
    return Http.axioxInstance.get(url, { params }).then(res => res.data).catch()
  }

  public httpPost<T>(url:string, data: AxiosRequestConfig):Promise<T> {
    return Http.axioxInstance.post(url, data).then(res => res.data).catch()
  }
}

export const http = new Http()
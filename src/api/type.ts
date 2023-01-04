import { AxiosRequestConfig } from 'axios'

type ResponseType = {
  code: number,
  message: string,
  data: any
}

type RoomListResType = {
  code: string,
  success?: boolean,
  message: string,
  data: Array<any>
}

type RoomListParamsType = AxiosRequestConfig & {
  pageNum: number,
  pageSize: number,
  city: string,
  cityCode: string
}

type RoomDetailParamsType = AxiosRequestConfig & {
  code: string
}

export type { 
  ResponseType,
  RoomListResType,
  RoomListParamsType,
  RoomDetailParamsType
}
type ResponseType = {
  code: number,
  message: string,
  data: any
}

type RoomListResType = {
  code: string,
  success: boolean,
  message: string,
  data: Array<any>
}

type RoomListParamsType = {
  pageNum: number,
  // pageSize: number,
  // city: string,
  // cityCode: string
}

export type { 
  ResponseType,
  RoomListResType,
  RoomListParamsType
}
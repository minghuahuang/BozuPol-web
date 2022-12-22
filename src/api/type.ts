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

export type { 
  ResponseType,
  RoomListResType
}
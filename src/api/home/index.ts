import { http } from "@/utils/http";
import type { RoomListResType, RoomListParamsType } from '../type'


export function fetchRoomList(params:any): Promise<RoomListResType> {
  return http.httpGet('https://testyl-web.wkbins.com/yl-web/ylParkController/parkList?city=北京&cityCode=110100', params)
}

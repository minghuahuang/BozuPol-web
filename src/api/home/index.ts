import { http } from "@/utils/http";
import type { RoomListResType, RoomListParamsType } from '../type'


export function fetchRoomList(params:RoomListParamsType): Promise<RoomListResType> {
  return http.httpGet('/yl-web/ylParkController/parkList', params)
}

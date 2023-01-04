import { http } from "@/utils/http";
import type { RoomListResType, RoomDetailParamsType } from '../type'


export function fetchRoomDetail(params:RoomDetailParamsType): Promise<RoomListResType> {
  return http.httpGet('/yl-web/ylParkController/getParkDetail', params)
}
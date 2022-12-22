import { http } from "@/utils/http";
import type { RoomListResType } from '../type'


export function fetchRoomList(): Promise<RoomListResType> {
  return http.httpGet('https://testyl-web.wkbins.com/yl-web/ylParkController/hotParkList', {})
}

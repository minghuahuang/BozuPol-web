import { http } from "../utils/http";
import DB from '../utils/indexedDB'
const db = new DB('bozupol')

export function fetchSessionId(data: object) {
  return http.httpPost('/api/web/session/get_session_info', data)
}

export async function fetchRoomList() {
  await db.openStore('room', 'id', ['length', 'width'])
  const result = await db.getItems('room').then(res => {
    return {
      code: 200,
      message: '操作成功',
      data: res,
      success: true
    }
  })
  return result
}
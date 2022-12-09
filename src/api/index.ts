import { http } from "../utils/http";

export function fetchSessionId(data: object) {
  return http.httpPost('/api/web/session/get_session_info', data)
}
import { http } from "../utils/http";

export function fetchSessionId() {
  return http.httpPost('http://182.92.190.152:8090/web/session/get_session_info', {})
}
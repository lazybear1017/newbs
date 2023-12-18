import { request } from "@/utils/request";

// 登录
export async function fetchLogin(body: any) {
  return request<any>("/user/login", {
    method: "POST",
    data: body,
    headers: {
      Authorization: "xcfAuthorizationxcf",
    },
  });
}

// 获取监控列表
export async function fetchMonitorPage(params: any, body: any, session: any) {
  return request<any>("/bck/monitor/page", {
    method: "POST",
    params,
    data: body,
    headers: {
      Authorization: session,
      "ADM-ROLE":
        "eyJsZWFDZW50ZXIiOmZhbHNlLCJtYWluIjp0cnVlLCJvaWQiOjEsIm9sZXZlbCI6MSwic3ViIjpmYWxzZX0=",
    },
  });
}

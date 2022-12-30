import axios, { AxiosResponse } from "axios";

const apiHost = "http://192.168.1.247:3000";

export const get = <T>(url: string) => axios.get<T>(apiHost + url);
export const _delete = <T>(url: string) => axios.delete<T>(apiHost + url);

export const post = <TRes, TReq>(url: string, body: TReq) =>
  axios.post<TReq, AxiosResponse<TRes>>(apiHost + url, body);
export const put = <TRes, TReq>(url: string, body: TReq) =>
  axios.put<TReq, AxiosResponse<TRes>>(apiHost + url, body);
export const patch = <TRes, TReq>(url: string, body: TReq) =>
  axios.patch<TReq, AxiosResponse<TRes>>(apiHost + url, body);

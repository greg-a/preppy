import axios, { AxiosResponse } from "axios";

const apiHost = "http://192.168.1.247:3000";

export const get = <T>(url: string) =>
  axios.get<T>(apiHost + url).then((res) => res.data);
export const _delete = <T>(url: string) => axios.delete<T>(apiHost + url);

export const post = <TRes>(url: string, body: unknown) =>
  axios.post<TRes>(apiHost + url, body).then((res) => res.data);
export const put = <TRes>(url: string, body: unknown) =>
  axios.put<TRes>(apiHost + url, body).then((res) => res.data);
export const patch = <TRes>(url: string, body: unknown) =>
  axios.patch<TRes>(apiHost + url, body).then((res) => res.data);

import { Request } from "express";

export type ReqBody<T> = Request<{}, {}, T>;
export type ReqQuery<T> = Request<T, {}, {}, T>;

export interface LoginRequest {
  email?: string;
  password?: string;
}

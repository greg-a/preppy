import { Request } from "express";

export type ReqBody<T> = Request<{}, {}, T>;
export type ReqQuery<T> = Request<T, {}, {}, {}>;

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

export interface CreateItemRequest {
  name: string;
  description?: string;
  note?: string;
  imageUrl?: string;
}

export type UpdateItemRequest = Partial<CreateItemRequest> & {
  id: number;
};

export interface CreateShoppingListRequest {
  name: string;
  description?: string;
}

export type UpdateShoppingListRequest = Partial<CreateShoppingListRequest> & {
  id: number;
};

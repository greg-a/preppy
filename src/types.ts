export interface UserAuthInfo {
  id: number;
  email?: string;
  name?: string;
  token: string;
}

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

enum Priority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export interface CreateShoppingListItemRequest {
  note?: string;
  priority?: Priority;
  quantity?: number;
  maxPrice?: number;
  minPrice?: number;
  complete?: boolean;
  itemId: number;
  shoppingListId: number;
}

export type UpdateShoppingListItemRequest =
  Partial<CreateShoppingListItemRequest> & {
    id: number;
  };

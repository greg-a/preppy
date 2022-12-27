interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

interface DecoratedMessage extends Timestamps {
  userId: number;
  id: number;
}

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

export interface Item extends DecoratedMessage, CreateItemRequest {}

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

export type CommonItem = {
  note?: string;
  priority?: Priority;
  quantity?: number;
  maxPrice?: number;
  minPrice?: number;
  complete?: boolean;
  shoppingListId: number;
};

type SavedItem = CommonItem & {
  itemId: number;
  item?: Item;
  name?: never;
};

type NonSavedItem = CommonItem & {
  itemId?: never;
  item?: never;
  name: string;
};

export type CreateShoppingListItemRequest = SavedItem | NonSavedItem;

export type UpdateShoppingListItemRequest =
  Partial<CreateShoppingListItemRequest> & {
    id: number;
  };

export type ShoppingListItemMessage = CreateShoppingListItemRequest &
  DecoratedMessage;

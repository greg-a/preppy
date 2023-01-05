import * as http from "./http";
import * as types from "../../../types";

const rootUrl = "/api/shoppingList";

export const getShoppingLists = () => {
  return http.get<types.ShoppingListMessage[]>(rootUrl);
};
export const getShoppingList = (id: number) => {
  return http.get<types.ShoppingListMessage>(`${rootUrl}/${id}`);
};
export const createList = (data: types.CreateShoppingListRequest) => {
  return http.post<types.ShoppingListMessage>(rootUrl, data);
};
export const addItem = (data: types.CreateShoppingListItemRequest) =>
  http.post<types.ShoppingListItemMessage>(`${rootUrl}/item`, data);

export const updateItem = (data: types.UpdateShoppingListItemRequest) => {
  return http.patch<types.ShoppingListItemMessage>(`${rootUrl}/item`, data);
};

export const removeItem = (itemId: number) => {
  return http._delete<types.ShoppingListItemMessage>(
    `${rootUrl}/item/${itemId}`
  );
};

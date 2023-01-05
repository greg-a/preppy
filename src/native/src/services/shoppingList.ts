import * as http from "./http";
import * as types from "../../../types";
import { useMutation, useQuery, useQueryClient } from "react-query";

const rootUrl = "/api/shoppingList";

export class ShoppingListService {
  GetShoppingLists = () => {
    const getLists = () => http.get<types.ShoppingListMessage[]>(rootUrl);
    return useQuery<types.ShoppingListMessage[]>("shoppingLists", getLists);
  };

  GetShoppingList = (id: number) => {
    const getList = () =>
      http.get<types.ShoppingListMessage>(`${rootUrl}/${id}`);
    return useQuery("shoppingList", getList);
  };

  CreateShoppingList = () => {
    const queryClient = useQueryClient();
    const saveShoppingList = (data: types.CreateShoppingListRequest) =>
      http.post<types.ShoppingListMessage>(rootUrl, data);
    return useMutation(saveShoppingList, {
      onSuccess: async (x) => {
        console.log(x);
        queryClient.invalidateQueries("shoppingLists");
      },
    });
  };

  AddItem = () => {
    const queryClient = useQueryClient();
    const addItem = (data: types.CreateShoppingListItemRequest) =>
      http.post<types.ShoppingListItemMessage>(`${rootUrl}/item`, data);
    const { mutate } = useMutation(addItem, {
      onSuccess: (res) => {
        console.log({ res });
        queryClient.invalidateQueries("shoppingList");
      },
    });
    return mutate;
  };

  UpdateItem = () => {
    const queryClient = useQueryClient();
    const updateItem = (data: types.UpdateShoppingListItemRequest) =>
      http.patch<types.ShoppingListItemMessage>(`${rootUrl}/item`, data);
    return useMutation(updateItem, {
      onSuccess: () => {
        queryClient.invalidateQueries("shoppingList");
      },
    });
  };
}

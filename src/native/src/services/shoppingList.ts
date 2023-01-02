import * as http from "./http";
import * as types from "../../../types";
import { useMutation, useQuery, useQueryClient } from "react-query";

const rootUrl = "/api/shoppingList";

export class ShoppingListService {
  GetShoppingLists = () => {
    const getItems = () =>
      http.get<types.ShoppingListMessage[]>(rootUrl).then((res) => res.data);
    return useQuery<types.ShoppingListMessage[]>("shoppingLists", getItems);
  };

  CreateShoppingList = () => {
    const queryClient = useQueryClient();
    const saveShoppingList = (data: types.CreateShoppingListRequest) =>
      http
        .post<types.ShoppingListMessage>(rootUrl, data)
        .then((res) => res.data);
    return useMutation(
      (data: types.CreateShoppingListItemRequest) => saveShoppingList(data),
      {
        onSuccess: async (x) => {
          console.log(x);
          queryClient.invalidateQueries("shoppingLists");
        },
      }
    );
  };
}

import * as http from "./http";
import * as types from "../../../types";
import { useMutation, useQuery, useQueryClient } from "react-query";

const rootUrl = "/api/items";

export class ItemsService {
  GetAllItems = () => {
    const getItems = () =>
      http.get<types.ItemMessage[]>(rootUrl).then((res) => res.data);
    return useQuery<types.ItemMessage[]>("items", getItems);
  };

  SaveItem = () => {
    const queryClient = useQueryClient();
    const saveItem = (data: types.CreateItemRequest) =>
      http.post<types.ItemMessage>(rootUrl, data).then((res) => res.data);
    return useMutation((data: types.CreateItemRequest) => saveItem(data), {
      onSuccess: async (x) => {
        console.log(x);
        queryClient.invalidateQueries("items");
      },
    });
  };
}

import * as http from "./http";
import * as types from "../../../types";

const rootUrl = "/api/items";

export const getAllItems = () => {
  return http.get<types.ItemMessage[]>(rootUrl);
};

export const saveItem = (data: types.CreateItemRequest) => {
  return http.post<types.ItemMessage>(rootUrl, data);
};

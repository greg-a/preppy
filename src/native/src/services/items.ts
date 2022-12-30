import * as http from "./http";
import * as types from "../../../types";

const rootUrl = "/api/items";

export const getAllItems = () =>
  http.get<types.ItemMessage[]>(rootUrl).then((res) => res.data);

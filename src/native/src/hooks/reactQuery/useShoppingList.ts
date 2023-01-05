import { useMutation, useQuery, useQueryClient } from "react-query";
import * as types from "../../../../types";
import * as service from "../../services";

export const useShoppingList = () => {
  const queryClient = useQueryClient();

  const getShoppingLists = () =>
    useQuery("shoppingList", service.getShoppingLists);

  const getShoppingList = (shoppingListId: number) =>
    useQuery("shoppingList", () => service.getShoppingList(shoppingListId));

  const createShoppingList = {
    ...useMutation(service.createList, {
      onSuccess: (res) => {
        console.log({ res });
        queryClient.invalidateQueries("shoppingLists");
      },
    }),
  };

  const addItem = {
    ...useMutation(service.addItem, {
      onSuccess: (res) => {
        console.log({ res });
        queryClient.invalidateQueries("shoppingList");
      },
    }),
  };

  const updateItem = {
    ...useMutation(service.updateItem, {
      onSuccess: () => {
        queryClient.invalidateQueries("shoppingList");
      },
    }),
  };

  return {
    getShoppingLists,
    getShoppingList,
    createShoppingList,
    addItem,
    updateItem,
  };
};

import { useMutation, useQuery, useQueryClient } from "react-query";
import * as service from "../../services/shoppingList";

export const useShoppingList = () => {
  const queryClient = useQueryClient();

  const getShoppingLists = () =>
    useQuery("shoppingList", service.getShoppingLists);

  const getShoppingList = (shoppingListId: number) =>
    useQuery(["shoppingList", shoppingListId], () =>
      service.getShoppingList(shoppingListId)
    );

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
        queryClient.invalidateQueries(["shoppingList", res.shoppingListId]);
      },
    }),
  };

  const updateItem = {
    ...useMutation(service.updateItem, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["shoppingList", res.shoppingListId]);
      },
    }),
  };

  const removeItem = {
    ...useMutation(service.removeItem, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["shoppingList", res.shoppingListId]);
      },
    }),
  };

  return {
    getShoppingLists,
    getShoppingList,
    createShoppingList,
    addItem,
    updateItem,
    removeItem,
  };
};

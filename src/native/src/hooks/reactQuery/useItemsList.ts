import { useMutation, useQuery, useQueryClient } from "react-query";
import * as service from "../../services";

export const useItemsList = () => {
  const queryClient = useQueryClient();

  const getAllItems = () => useQuery("items", service.getAllItems);

  const saveItem = {
    ...useMutation(service.saveItem, {
      onSuccess: async (x) => {
        console.log(x);
        queryClient.invalidateQueries("items");
      },
    }),
  };

  return {
    getAllItems,
    saveItem,
  };
};

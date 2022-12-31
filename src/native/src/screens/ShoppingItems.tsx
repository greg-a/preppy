import React from "react";
import { ServiceResolver } from "../services";
import { BasicRow } from "../components/common/listItems/BasicRow";
import { BasicFlatList } from "../components/common/BasicFlatList";

export const ShoppingItems = () => {
  const [newItem, setNewItem] = React.useState("");
  const { data } = ServiceResolver.ItemsService.GetAllItems();
  const { mutate } = ServiceResolver.ItemsService.SaveItem();

  const handleEndEdit = () => {
    mutate({ name: newItem });
    setNewItem("");
  };
  return (
    <BasicFlatList
      data={data}
      textInputProps={{
        value: newItem,
        onChangeText: setNewItem,
        onEndEditing: handleEndEdit,
      }}
      renderItem={({ item }) => <BasicRow item={item} />}
    />
  );
};

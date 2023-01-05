import React from "react";
import { BasicRow } from "../components/common/listItems/BasicRow";
import { BasicFlatList } from "../components/common/BasicFlatList";
import { useItemsList } from "../hooks/reactQuery";

export const ShoppingItems = () => {
  const { getAllItems, saveItem } = useItemsList();
  const [newItem, setNewItem] = React.useState("");
  const { data } = getAllItems();

  const handleEndEdit = () => {
    saveItem.mutate({ name: newItem });
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

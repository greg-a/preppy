import React from "react";
import { useTheme } from "@react-navigation/native";
import * as types from "../../../types";
import { BasicFlatList } from "../components/common/BasicFlatList";
import { BasicRow } from "../components/common/listItems/BasicRow";

const mockData: types.ShoppingListItemMessage[] = [
  {
    id: 1,
    name: "Bananas",
    shoppingListId: 1,
    userId: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 2,
    itemId: 1,
    name: "Bread",
    item: { name: "Bread", createdAt: "", updatedAt: "", id: 1, userId: 1 },
    shoppingListId: 1,
    userId: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 3,
    itemId: 1,
    name: "Milk",
    item: { name: "Milk", createdAt: "", updatedAt: "", id: 1, userId: 1 },
    shoppingListId: 1,
    userId: 1,
    createdAt: "",
    updatedAt: "",
  },
];

export const ShoppingList = () => {
  const theme = useTheme();
  const [newItem, setNewItem] = React.useState("");
  const [shoppingListItems, setShoppingListItems] = React.useState(mockData);

  const handleEndEdit = () => {
    if (newItem.length === 0) return null;
    setNewItem("");
    const id = Math.max(...shoppingListItems.map((x) => x.id));
    const mutateShoppingList = [...shoppingListItems];
    mutateShoppingList.unshift({
      id: id + 1,
      itemId: 0,
      shoppingListId: 1,
      userId: 1,
      createdAt: "",
      updatedAt: "",
      name: newItem,
      item: { name: newItem, id: 1, userId: 1, createdAt: "", updatedAt: "" },
    });
    setShoppingListItems(mutateShoppingList);
  };

  const handleCompleteItem = (item: types.ShoppingListItemMessage) => {
    const mutateShoppingList = [...shoppingListItems];
    const itemIdx = mutateShoppingList.findIndex(({ id }) => id === item.id);
    let updatedItem = { ...item };
    updatedItem.complete = !item.complete;
    mutateShoppingList.splice(itemIdx, 1, updatedItem);
    setShoppingListItems([...mutateShoppingList]);
  };

  const handleRemoveItem = (item: types.ShoppingListItemMessage) => {
    const mutateShoppingList = [...shoppingListItems].filter(
      (x) => x.id !== item.id
    );
    setShoppingListItems(mutateShoppingList);
  };

  return (
    <BasicFlatList
      textInputProps={{
        value: newItem,
        onChangeText: setNewItem,
        onEndEditing: handleEndEdit,
      }}
      data={shoppingListItems.map((item) => ({
        ...item,
        name: item.name ?? item.item.name,
      }))}
      renderItem={({ item }) => (
        <BasicRow
          enableCheckbox
          item={item}
          onCheckboxPress={handleCompleteItem}
          onRemoveItem={handleRemoveItem}
          onViewItemDetails={() => {}}
        />
      )}
    />
  );
};

import React from "react";
import { ShoppingListItemMessage } from "../../../types";
import { BasicFlatList } from "../components/common/BasicFlatList";
import { BasicRow } from "../components/common/listItems/BasicRow";
import { ServiceResolver } from "../services";

export const ShoppingList = () => {
  const { data, isLoading } =
    ServiceResolver.ShoppingListService.GetShoppingList(1);
  const addItem = ServiceResolver.ShoppingListService.AddItem();
  const updateItem = ServiceResolver.ShoppingListService.UpdateItem();
  const [newItem, setNewItem] = React.useState("");

  const handleEndEdit = () => {
    if (data && data.id && newItem.trim().length > 0) {
      setNewItem("");
      addItem({ name: newItem, shoppingListId: data.id });
    }
  };

  const handleCompleteItem = (item: ShoppingListItemMessage) => {
    updateItem.mutate({ id: item.id, complete: !item.complete });
  };

  const handleRemoveItem = () => {};

  return (
    <BasicFlatList
      refreshing={isLoading}
      textInputProps={{
        value: newItem,
        onChangeText: setNewItem,
        onEndEditing: handleEndEdit,
      }}
      data={data ? data.items : []}
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

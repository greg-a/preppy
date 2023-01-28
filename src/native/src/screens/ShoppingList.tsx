import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ShoppingListItemMessage } from "../../../types";
import { BasicFlatList } from "../components/common/BasicFlatList";
import { BasicRow } from "../components/common/listItems/BasicRow";
import { useShoppingList } from "../hooks/reactQuery";

export type RootStackParamList = {
  Home: undefined;
  ShoppingList: undefined;
  ShoppingItems: undefined;
  ShoppingItemDetails: { item: ShoppingListItemMessage };
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const ShoppingList = ({ navigation }: Props) => {
  const { getShoppingList, addItem, updateItem, removeItem } =
    useShoppingList();
  const { data, isLoading } = getShoppingList(1);
  const [newItem, setNewItem] = React.useState("");

  const handleEndEdit = () => {
    if (data && data.id && newItem.trim().length > 0) {
      setNewItem("");
      addItem.mutate({ name: newItem, shoppingListId: data.id });
    }
  };

  const handleCompleteItem = (item: ShoppingListItemMessage) => {
    updateItem.mutate({ id: item.id, complete: !item.complete });
  };

  const handleRemoveItem = (item: ShoppingListItemMessage) => {
    removeItem.mutate(item.id);
  };

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
          onViewItemDetails={() =>
            navigation.navigate("ShoppingItemDetails", { item })
          }
        />
      )}
    />
  );
};

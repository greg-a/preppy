import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as types from "../../../types";
import { TextInput } from "../components/common/inputs/TextInput";
import { ShoppingListItem } from "../ShoppingList/ShoppingListItem";

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
    item: { name: "Bread", createdAt: "", updatedAt: "", id: 1, userId: 1 },
    shoppingListId: 1,
    userId: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 3,
    itemId: 1,
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
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <TextInput
            value={newItem}
            onChangeText={setNewItem}
            IconLeft={() => <Ionicons name="add" size={24} color="black" />}
            onEndEditing={handleEndEdit}
            placeholder="add item"
            returnKeyType="done"
          />
        }
        keyExtractor={(item) => String(item.id)}
        style={styles.list}
        data={shoppingListItems}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: theme.colors.border }} />
        )}
        renderItem={({ item }) => (
          <ShoppingListItem
            item={item}
            onComplete={handleCompleteItem}
            onRemoveItem={handleRemoveItem}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    alignSelf: "center",
  },
  list: {
    // marginLeft: 25,
    // marginRight: 25,
  },
});

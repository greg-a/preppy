import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as types from "../../../types";
import { TextInput } from "../components/common/inputs/TextInput";
import { SwipeableRow } from "../components/common/SwipeableRow";

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

  const handleSwipe = (
    direction: "right" | "left",
    item: types.ShoppingListItemMessage
  ) => {
    setTimeout(() => {}, 3_000);
    const mutateShoppingList = [...shoppingListItems];
    const itemIdx = mutateShoppingList.findIndex(({ id }) => id === item.id);
    let updatedItem = { ...item };
    if (direction === "left") {
      updatedItem.complete = true;
    }
    if (direction === "right") {
      updatedItem.complete = false;
    }
    mutateShoppingList.splice(itemIdx, 1, updatedItem);
    setShoppingListItems([...mutateShoppingList]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Shopping List</Text>
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
          <View style={{ height: 1, backgroundColor: "lightgrey" }} />
        )}
        renderItem={({ item }) => (
          <SwipeableRow item={item} onSwipe={handleSwipe} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    margin: 25,
  },
});

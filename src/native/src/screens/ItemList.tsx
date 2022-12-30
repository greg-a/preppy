import React from "react";
import { FlatList, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "../components/common/inputs/TextInput";
import { ShoppingListItem } from "../ShoppingList/ShoppingListItem";
import { getAllItems } from "../services";

export const ItemList = () => {
  const [newItem, setNewItem] = React.useState("");
  const handlePress = async () => {
    const results = await getAllItems();
    console.log(results);
    return results;
  };
  return (
    <View>
      <TouchableOpacity onPress={async () => await handlePress()}>
        <Text style={{ padding: 30 }}>Get Items</Text>
      </TouchableOpacity>
      <FlatList
        data={[]}
        ListHeaderComponent={
          <TextInput
            value={newItem}
            onChangeText={setNewItem}
            IconLeft={() => <Ionicons name="add" size={24} color="black" />}
            onEndEditing={() => {}}
            placeholder="add item"
            returnKeyType="done"
          />
        }
        renderItem={({ item }) => (
          <ShoppingListItem
            item={item}
            onComplete={() => {}}
            onRemoveItem={() => {}}
          />
        )}
      />
    </View>
  );
};

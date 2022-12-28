import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import * as types from "../../../types";
import { RightActions } from "./RightActions";

interface Props {
  item: types.ShoppingListItemMessage;
  onComplete: (item: types.ShoppingListItemMessage) => void;
  onRemoveItem: (item: types.ShoppingListItemMessage) => void;
}

export const ShoppingListItem = ({ item, onComplete, onRemoveItem }: Props) => {
  const theme = useTheme();
  const closeRowTimerRef = React.useRef(null);
  const [viewActions, setViewActions] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (closeRowTimerRef.current) {
        clearTimeout(closeRowTimerRef.current);
      }
    };
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          flex: 1,
        }}
      >
        <Checkbox
          value={item.complete}
          onValueChange={() => onComplete(item)}
        />
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => setViewActions((prev) => !prev)}
        >
          <Text
            style={[
              styles.item,
              {
                textDecorationLine: item.complete ? "line-through" : "none",
                backgroundColor: theme.colors.background,
              },
            ]}
          >
            {item.name ?? item.item.name}
          </Text>
        </TouchableOpacity>
      </View>
      {viewActions && (
        <RightActions
          item={item}
          onRemove={onRemoveItem}
          onViewDetails={() => {}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 20,
    // borderBottomWidth: 1,
    paddingLeft: 15,
    width: "100%",
  },
});

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as types from "../../../../types";
import { RightActions } from "../../ShoppingList/RightActions";

const LeftAction = () => (
  <View style={{ justifyContent: "center" }}>
    <Text>Completed</Text>
  </View>
);

interface Props {
  item: types.ShoppingListItemMessage;
  onSwipe: (
    direction: "left" | "right",
    item: types.ShoppingListItemMessage
  ) => void;
  onRemoveItem: (item: types.ShoppingListItemMessage) => void;
}

export const SwipeableRow = ({ item, onSwipe, onRemoveItem }: Props) => {
  const ref = React.useRef<Swipeable>();
  const closeRowTimerRef = React.useRef(null);

  const handleCloseRow = () => {
    closeRowTimerRef.current = setTimeout(() => {
      ref.current?.close();
    }, 200);
  };

  const handleSwipe = (
    direction: "left" | "right",
    item: types.ShoppingListItemMessage
  ) => {
    onSwipe(direction, item);
    if (direction === "left") {
      handleCloseRow();
    }
  };

  const handleRemoveItem = (item: types.ShoppingListItemMessage) => {
    onRemoveItem(item);
    handleCloseRow();
  };

  React.useEffect(() => {
    return () => {
      if (closeRowTimerRef.current) {
        clearTimeout(closeRowTimerRef.current);
      }
    };
  }, []);

  return (
    <Swipeable
      ref={ref}
      renderLeftActions={LeftAction}
      renderRightActions={() => (
        <RightActions
          item={item}
          onRemove={handleRemoveItem}
          onViewDetails={() => {}}
        />
      )}
      leftThreshold={100}
      onSwipeableOpen={(direction) => handleSwipe(direction, item)}
    >
      <TouchableOpacity>
        <Text
          style={[
            styles.item,
            {
              textDecorationLine: item.complete ? "line-through" : "none",
            },
          ]}
        >
          {item.name ?? item.item.name}
        </Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
    padding: 10,
    backgroundColor: "#fff",
  },
});

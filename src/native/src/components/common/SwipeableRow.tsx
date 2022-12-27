import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as types from "../../../../types";

const LeftAction = ({ item }: { item: types.ShoppingListItemMessage }) => (
  <View>
    <Text>Completed</Text>
  </View>
);

const RightAction = ({ item }: { item: types.ShoppingListItemMessage }) => (
  <View>
    <Text>Remove</Text>
  </View>
);

interface Props {
  item: types.ShoppingListItemMessage;
  onSwipe: (
    direction: "left" | "right",
    item: types.ShoppingListItemMessage
  ) => void;
}

export const SwipeableRow = ({ item, onSwipe }: Props) => {
  const ref = React.useRef<Swipeable>();

  const handleSwipe = (
    direction: "left" | "right",
    item: types.ShoppingListItemMessage
  ) => {
    onSwipe(direction, item);
    setTimeout(() => {
      ref.current?.close();
    }, 1000);
  };
  return (
    <Swipeable
      ref={ref}
      renderLeftActions={() => LeftAction({ item })}
      renderRightActions={() => RightAction({ item })}
      leftThreshold={75}
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
  },
});

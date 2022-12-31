import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { RightActions } from "./RightActions";

interface BaseItem {
  name: string;
  complete?: boolean;
}

interface Props<T> {
  item: T;
  enableCheckbox?: boolean;
  onCheckboxPress?: (item: T) => void;
  onRemoveItem?: (item: T) => void;
  onViewItemDetails?: (item: T) => void;
}

export const BasicRow = <T extends BaseItem>(props: Props<T>) => {
  const {
    item,
    onCheckboxPress,
    enableCheckbox,
    onRemoveItem,
    onViewItemDetails,
  } = props;
  const theme = useTheme();
  const closeRowTimerRef = React.useRef(null);
  const [viewActions, setViewActions] = React.useState(false);
  const enableActions = "onRemoveItem" && "onViewItemDetails" in props;

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
        {enableCheckbox && (
          <Checkbox
            value={item.complete}
            onValueChange={() => onCheckboxPress(item)}
          />
        )}
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
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
      {enableActions && viewActions && (
        <RightActions
          item={item}
          onRemove={onRemoveItem}
          onViewDetails={onViewItemDetails}
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

import React from "react";
import {
  FlatList as RNFlatlist,
  FlatListProps,
  StyleSheet,
  TextInputProps,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { TextInput } from "./inputs/TextInput";

type Props<T> = FlatListProps<T> & {
  textInputProps: TextInputProps;
};

export const BasicFlatList = <T extends { id: number }>(props: Props<T>) => {
  const theme = useTheme();
  const { textInputProps, ...flatListProps } = props;

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <RNFlatlist
        ListHeaderComponent={
          <TextInput
            IconLeft={() => <Ionicons name="add" size={24} color="black" />}
            placeholder="add item"
            returnKeyType="done"
            {...textInputProps}
          />
        }
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: theme.colors.border }} />
        )}
        {...flatListProps}
        style={[styles.list, props.style]}
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

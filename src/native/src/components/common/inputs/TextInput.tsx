import React from "react";
import {
  StyleSheet,
  TextInputProps as RNTextInputProps,
  TextInput as RNTextInput,
  View,
} from "react-native";

export interface TextInputProps extends RNTextInputProps {
  IconLeft: () => JSX.Element;
}

export const TextInput = ({ IconLeft, ...props }: TextInputProps) => {
  return (
    <View>
      <View style={{ position: "absolute", left: 10, top: 12, zIndex: 100 }}>
        <IconLeft />
      </View>
      <RNTextInput
        {...props}
        clearButtonMode="always"
        style={[styles.baseInput, { paddingLeft: IconLeft ? 40 : 0 }]}
        placeholderTextColor="grey"
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  baseInput: {
    padding: 12,
    borderBottomWidth: 1,
    fontSize: 20,
    fontWeight: "500",
    width: "100%",
  },
});

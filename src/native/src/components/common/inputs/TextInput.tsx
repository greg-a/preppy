import React from "react";
import {
  StyleSheet,
  TextInputProps as RNTextInputProps,
  TextInput as RNTextInput,
  View,
} from "react-native";

export interface TextInputProps extends RNTextInputProps {
  IconLeft?: () => JSX.Element;
  width?: string | number;
}

export const TextInput = ({
  IconLeft,
  width = "100%",
  ...props
}: TextInputProps) => {
  return (
    <View style={{ width }}>
      {IconLeft && (
        <View
          style={{
            position: "absolute",
            left: 10,
            zIndex: 100,
            top: StyleSheet.flatten(props.style).padding,
          }}
        >
          <IconLeft />
        </View>
      )}
      <RNTextInput
        clearButtonMode="always"
        {...props}
        style={[
          styles.baseInput,
          { paddingLeft: IconLeft ? 40 : 0 },
          props.style,
        ]}
        placeholderTextColor="grey"
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  baseInput: {
    // padding: 12,
    borderBottomWidth: 1,
    fontSize: 20,
    fontWeight: "500",
    width: "100%",
  },
});

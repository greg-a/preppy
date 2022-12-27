import React from "react";
import {
  StyleSheet,
  TextInputProps,
  TextInput as RNTextInput,
  TextInput as RNTI,
  View,
} from "react-native";

interface Props extends TextInputProps {
  IconLeft: () => JSX.Element;
}

export const TextInput = ({ IconLeft, ...props }: Props) => {
  const [isFocused, setIsFocused] = React.useState(
    props.autoFocus ? true : false
  );
  return (
    <View>
      <View style={{ position: "absolute", left: 0, top: 10, zIndex: 100 }}>
        <IconLeft />
      </View>
      <RNTextInput
        {...props}
        clearButtonMode="always"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.baseInput,
          { borderColor: isFocused ? "grey" : "lightgrey" },
          { paddingLeft: IconLeft ? 30 : 0 },
        ]}
        placeholderTextColor="grey"
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  baseInput: {
    padding: 10,
    backgroundColor: "#fff",
    // borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    fontSize: 20,
    fontWeight: "500",
    width: "100%",
  },
});

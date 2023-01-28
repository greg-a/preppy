import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { ShoppingListItemMessage } from "../../../types";
import { TextInput } from "../components/common/inputs/TextInput";

export type RootStackParamList = {
  Home: undefined;
  ShoppingList: undefined;
  ShoppingItems: undefined;
  ShoppingItemDetails: { item: ShoppingListItemMessage };
};

type Props = NativeStackScreenProps<RootStackParamList, "ShoppingItemDetails">;

export const ShoppingItemDetails = ({ route }: Props) => {
  const { item } = route.params;
  return (
    <View>
      <View style={[{ marginTop: 15 }, styles.section]}>
        <Text style={styles.label}>Complete: </Text>
        <Text style={styles.text}>{item.complete ? "yup" : "nope"}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Priority: </Text>
        <Text style={styles.text}>{item.priority}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Quantity: </Text>
        <TextInput
          value={String(item.quantity)}
          editable={false}
          width="auto"
          style={{ borderBottomWidth: 0 }}
          clearButtonMode="never"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Max Price: </Text>
        <TextInput
          value={String(item.maxPrice ?? 0)}
          editable={false}
          width="auto"
          IconLeft={() => <Text style={{ fontSize: 20 }}>$</Text>}
          style={{ borderBottomWidth: 0 }}
          clearButtonMode="never"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Min Price: </Text>
        <TextInput
          value={String(item.minPrice ?? 0)}
          editable={false}
          width="auto"
          IconLeft={() => <Text style={{ fontSize: 20 }}>$</Text>}
          style={{ borderBottomWidth: 0 }}
          clearButtonMode="never"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Added by: </Text>
        <Text style={styles.text}>{item.user?.name}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Note: </Text>
        <TextInput value={item.note} multiline editable={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 20,
    fontWeight: "800",
  },
  text: {
    fontSize: 20,
  },
});

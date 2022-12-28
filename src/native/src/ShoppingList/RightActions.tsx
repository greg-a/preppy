import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ShoppingListItemMessage } from "../../../types";

interface Props {
  item: ShoppingListItemMessage;
  onRemove: (item: ShoppingListItemMessage) => void;
  onViewDetails: (item: ShoppingListItemMessage) => void;
}

export const RightActions = ({ item, onRemove, onViewDetails }: Props) => {
  const deleteTimerRef = React.useRef(null);
  const [deleting, setDeleting] = React.useState(false);

  const handleRemove = (item: ShoppingListItemMessage) => {
    setDeleting(true);

    deleteTimerRef.current = setTimeout(() => {
      onRemove(item);
      setDeleting(false);
    }, 1500);
  };

  const handleUndoRemove = () => {
    if (deleteTimerRef.current) {
      clearTimeout(deleteTimerRef.current);
    }
    setDeleting(false);
  };

  React.useEffect(() => {
    return () => {
      if (deleteTimerRef.current) {
        clearTimeout(deleteTimerRef.current);
      }
    };
  }, []);

  return (
    <View style={{ flexDirection: "row", paddingRight: 20 }}>
      {deleting ? (
        <TouchableOpacity
          style={{
            justifyContent: "center",
          }}
          onPress={handleUndoRemove}
        >
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => onViewDetails(item)}
            style={{ justifyContent: "center", marginRight: 15 }}
          >
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleRemove(item)}
            style={{
              justifyContent: "center",
            }}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 17,
  },
});

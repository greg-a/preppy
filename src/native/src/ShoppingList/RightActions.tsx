import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
    }, 2000);
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
    <View style={{ flexDirection: "row" }}>
      {deleting ? (
        <TouchableOpacity
          style={{
            height: "100%",
            justifyContent: "center",
          }}
          onPress={handleUndoRemove}
        >
          <Text>Undo</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => handleRemove(item)}
            style={{
              marginRight: 15,
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Text>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onViewDetails(item)}
            style={{ height: "100%", justifyContent: "center" }}
          >
            <Text>Details</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

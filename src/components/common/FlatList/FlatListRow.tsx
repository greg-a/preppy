import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Checkbox from 'expo-checkbox';
import {MaterialIcons} from '@expo/vector-icons';

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
  onItemPress?: (item: T) => void;
  showActions?: boolean;
}

export const FlatListRow = <T extends BaseItem>(props: Props<T>) => {
  const {
    item,
    onCheckboxPress,
    enableCheckbox,
    onRemoveItem,
    onViewItemDetails,
    onItemPress,
    showActions,
  } = props;
  const closeRowTimerRef = React.useRef(null);

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          flex: 1,
        }}>
        {enableCheckbox && (
          <Checkbox
            value={item.complete}
            onValueChange={() => onCheckboxPress?.(item)}
          />
        )}
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => onItemPress?.(item)}>
          <Text
            style={[
              styles.item,
              {
                textDecorationLine: item.complete ? 'line-through' : 'none',
              },
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{padding: 10}}>
        <MaterialIcons name="delete-forever" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 25,
    paddingLeft: 15,
    width: '100%',
  },
});

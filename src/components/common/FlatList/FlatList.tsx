import React from 'react';
import {
  FlatList as RNFlatlist,
  FlatListProps,
  StyleSheet,
  TextInputProps,
  View,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '@react-navigation/native';
import {TextInput} from '../inputs/TextInput';

type Props<T> = FlatListProps<T> & {
  textInputProps: TextInputProps;
};

export const FlatList = <T extends {id: number | string}>(props: Props<T>) => {
  const theme = useTheme();
  const {textInputProps, ...flatListProps} = props;

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <TextInput
        IconLeft={() => <Ionicons name="add" size={24} color="black" />}
        placeholder="add item"
        returnKeyType="done"
        style={{padding: 12}}
        {...textInputProps}
      />
      <RNFlatlist
        keyExtractor={item => String(item.id)}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: theme.colors.border}} />
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
    alignSelf: 'center',
  },
  list: {
    // marginLeft: 25,
    // marginRight: 25,
  },
});

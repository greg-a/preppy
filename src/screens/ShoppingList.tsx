import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, StatusBar} from 'react-native';
import {FlatList} from '../components/common/FlatList/FlatList';
import {FlatListRow} from '../components/common/FlatList/FlatListRow';

export const ShoppingList = () => {
  const [newItemInput, setNewItemInput] = React.useState('');
  const [list, setList] = React.useState([{id: 1, name: 'grapes'}]);
  const [id, setId] = React.useState(2);

  const addItem = (item: string) => {
    if (newItemInput.trim().length > 0) {
      setList(prev => [{id, name: item}, ...prev]);
      setNewItemInput('');
      setId(prev => prev + 1);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        textInputProps={{
          value: newItemInput,
          onChangeText: setNewItemInput,
          onSubmitEditing: () => addItem(newItemInput),
          blurOnSubmit: false,
        }}
        data={list}
        renderItem={({item}) => (
          <FlatListRow
            enableCheckbox
            item={item}
            showActions
            // onCheckboxPress={handleCompleteItem}
            // onRemoveItem={handleRemoveItem}
          />
        )}
        keyExtractor={item => String(item.id)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    width: '100%',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

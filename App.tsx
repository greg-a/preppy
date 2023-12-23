import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {ShoppingList} from './src/screens/ShoppingList';

export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

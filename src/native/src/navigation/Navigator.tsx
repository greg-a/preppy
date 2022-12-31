import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import {
  NavigationContainer,
  Theme,
  DarkTheme as Dark,
} from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { ShoppingList } from "../../src/screens/ShoppingList";
import { ShoppingItems } from "../screens/ShoppingItems";

const Drawer = createDrawerNavigator();

export const Navigator = () => {
  const scheme = useColorScheme();
  const theme = React.useMemo(
    () => (scheme === "dark" ? DarkTheme : LightTheme),
    [scheme]
  );
  const options: DrawerNavigationOptions = {
    headerStyle: { backgroundColor: theme.colors.background },
    headerTitleStyle: styles.title,
  };
  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator screenOptions={options}>
        <Drawer.Screen name="Shopping List" component={ShoppingList} />
        <Drawer.Screen name="Shopping Items" component={ShoppingItems} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const LightTheme: Theme = {
  colors: {
    primary: "#025e89",
    background: "#dabaf5",
    card: "#797c8c",
    text: "#1c1c1e",
    border: "#797c8c",
    notification: "#ff453a",
  },
  dark: false,
};

const DarkTheme: Theme = {
  colors: {
    ...Dark.colors,
    primary: "#025e89",
    text: "#fff",
    border: "#3d3d3d",
    card: "#8b8b8b",
  },
  dark: true,
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
});

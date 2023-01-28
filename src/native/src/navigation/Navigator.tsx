import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  Theme,
  DarkTheme as Dark,
} from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { ShoppingList } from "../screens/ShoppingList";
import { ShoppingItems } from "../screens/ShoppingItems";
import { ShoppingItemDetails } from "../screens/ShoppingItemDetails";

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

export const DrawerNavigator = () => {
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
    <Drawer.Navigator screenOptions={options}>
      <Drawer.Screen name="ShoppingList" component={ShoppingList} />
      <Drawer.Screen name="ShoppingItems" component={ShoppingItems} />
    </Drawer.Navigator>
  );
};

export const Navigator = () => {
  const scheme = useColorScheme();
  const theme = React.useMemo(
    () => (scheme === "dark" ? DarkTheme : LightTheme),
    [scheme]
  );
  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleStyle: styles.title,
          headerStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <RootStack.Screen name="Home" component={DrawerNavigator} />
        <RootStack.Screen
          name="ShoppingItemDetails"
          component={ShoppingItemDetails}
          options={({ route }: any) => ({
            presentation: "modal",
            headerShown: true,
            headerBackTitle: "Back",
            headerTitle: route.params.item.name,
          })}
        />
      </RootStack.Navigator>
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

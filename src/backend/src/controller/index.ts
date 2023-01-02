import { Express } from "express";
import { ItemController } from "./item";
import { ShoppingListController } from "./shoppingList";
import { UserController } from "./user";

export const controller = (app: Express) => {
  UserController(app);
  ItemController(app);
  ShoppingListController(app);
};

import { Express } from "express";
import { userController } from "./user";

export const controller = (app: Express) => {
  userController(app);
};

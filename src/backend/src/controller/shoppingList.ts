import { Express } from "express";
import { PrismaClient } from "@prisma/client";
import * as types from "../types";
import { sendError } from "./utils/errorHandling";

const rootUrl = "/api/shoppingList";

export const ShoppingListController = (app: Express, prisma: PrismaClient) => {
  app.get(rootUrl, async (req, res) => {
    try {
      const result = await prisma.shoppingList.findMany();
      res.json(result);
    } catch (e) {
      sendError(e, res);
    }
  });
  app.post(
    rootUrl,
    async (req: types.ReqBody<types.CreateShoppingListRequest>, res) => {
      try {
        const result = await prisma.shoppingList.create({
          data: { ...req.body, userId: req.user?.id ?? 1 },
        });
        res.json(result);
      } catch (e) {
        sendError(e, res);
      }
    }
  );
  app.patch(
    `${rootUrl}/update`,
    async (req: types.ReqBody<types.UpdateShoppingListRequest>, res) => {
      try {
        const result = await prisma.shoppingList.update({
          where: { id: req.body.id },
          data: req.body,
        });
        res.json(result);
      } catch (e) {
        sendError(e, res);
      }
    }
  );
};

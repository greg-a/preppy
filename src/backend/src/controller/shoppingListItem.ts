import { Express } from "express";
import { prisma } from "../../prisma/client";
import * as types from "../../../types";
import { ReqBody } from "../types";
import { sendError } from "./utils/errorHandling";

const rootUrl = "/api/shoppingListItems";

export const ShoppingListItemController = (app: Express) => {
  app.get(rootUrl, async (req, res) => {
    try {
      const result = await prisma.shoppingListItem.findMany();
      res.json(result);
    } catch (e) {
      sendError(e, res);
    }
  });
  app.post(
    rootUrl,
    async (req: ReqBody<types.CreateShoppingListItemRequest>, res) => {
      try {
        const result = await prisma.shoppingListItem.create({
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
    async (req: ReqBody<types.UpdateShoppingListItemRequest>, res) => {
      try {
        const result = await prisma.item.update({
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

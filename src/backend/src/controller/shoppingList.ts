import { Express } from "express";
import * as types from "../../../types";
import { prisma } from "../../prisma/client";
import { sendError } from "./utils/errorHandling";
import { ReqBody } from "../types";

const rootUrl = "/api/shoppingList";

export const ShoppingListController = (app: Express) => {
  app.get(rootUrl, async (req, res) => {
    try {
      const result = await prisma.shoppingList.findMany({
        where: { userId: 1 },
        include: { items: { include: { user: { select: { name: true } } } } },
      });
      res.json(result);
    } catch (e) {
      sendError(e, res);
    }
  });
  app.get(`${rootUrl}/:shoppingListId`, async (req, res) => {
    try {
      const result = await prisma.shoppingList.findFirst({
        where: { userId: 1, id: Number(req.params.shoppingListId) },
        include: { items: { include: { user: { select: { name: true } } } } },
      });
      res.json(result);
    } catch (e) {
      sendError(e, res);
    }
  });
  app.post(
    rootUrl,
    async (req: ReqBody<types.CreateShoppingListRequest>, res) => {
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
    async (req: ReqBody<types.UpdateShoppingListRequest>, res) => {
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
  app.post(
    `${rootUrl}/item`,
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
    `${rootUrl}/item`,
    async (req: ReqBody<types.UpdateShoppingListItemRequest>, res) => {
      try {
        const { id, ...rest } = req.body;
        const result = await prisma.shoppingListItem.update({
          where: { id },
          data: rest,
        });
        res.json(result);
      } catch (e) {
        sendError(e, res);
      }
    }
  );
  app.delete(`${rootUrl}/item/:shoppingItemId`, async (req, res) => {
    try {
      const result = await prisma.shoppingListItem.delete({
        where: { id: Number(req.params.shoppingItemId) },
      });
      res.json(result);
    } catch (e) {
      sendError(e, res);
    }
  });
};

import { Express } from "express";
import { PrismaClient } from "@prisma/client";
import * as types from "../types";
import { sendError } from "./utils/errorHandling";
import { prisma } from "../../prisma/client";

const rootUrl = "/api/items";

export const ItemController = (app: Express) => {
  app.get(rootUrl, async (req, res) => {
    try {
      const result = await prisma.item.findMany();
      res.json(result);
    } catch (e) {
      sendError(e, res);
    }
  });
  app.post(
    rootUrl,
    async (req: types.ReqBody<types.CreateItemRequest>, res) => {
      try {
        const result = await prisma.item.create({
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
    async (req: types.ReqBody<types.UpdateItemRequest>, res) => {
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

import { Express } from "express";
import { prisma } from "../../prisma/client";
import * as types from "../../../types";
import { sendError } from "./utils/errorHandling";
import { ReqBody } from "../types";

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
  app.post(rootUrl, async (req: ReqBody<types.CreateItemRequest>, res) => {
    try {
      const result = await prisma.item.create({
        data: { ...req.body, userId: req.user?.id ?? 1 },
      });
      res.json(result);
    } catch (e) {
      sendError(e, res);
    }
  });
  app.patch(
    `${rootUrl}/update`,
    async (req: ReqBody<types.UpdateItemRequest>, res) => {
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

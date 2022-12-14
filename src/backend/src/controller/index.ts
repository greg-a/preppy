import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import { UserController } from "./user";

const prisma = new PrismaClient();

export const controller = (app: Express) => {
  UserController(app, prisma);
};

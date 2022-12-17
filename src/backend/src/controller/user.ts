import { Express } from "express";
import { CreateUserRequest } from "../../../types";
import { prisma } from "../../prisma/client";
import { CreateUser } from "../repository/user";
import { ReqBody } from "../types";

const rootUrl = "/api/users";

export const UserController = (app: Express) => {
  app.post(`/api/signup`, async (req: ReqBody<CreateUserRequest>, res) => {
    try {
      const result = await CreateUser(req.body);
      res.json(result);
    } catch (e) {
      res.status(500).send("error, unable to create new user");
    }
  });

  app.get(rootUrl, async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (e) {
      res.status(500).send("server error");
    }
  });
  // app.get("/feed", async (req, res) => {
  //   const { searchString, skip, take, orderBy } = req.query;

  //   const or: Prisma.PostWhereInput = searchString
  //     ? {
  //         OR: [
  //           { title: { contains: searchString as string } },
  //           { content: { contains: searchString as string } },
  //         ],
  //       }
  //     : {};

  //   const posts = await prisma.post.findMany({
  //     where: {
  //       published: true,
  //       ...or,
  //     },
  //     include: { author: true },
  //     take: Number(take) || undefined,
  //     skip: Number(skip) || undefined,
  //     orderBy: {
  //       updatedAt: orderBy as Prisma.SortOrder,
  //     },
  //   });

  //   res.json(posts);
  // });
};

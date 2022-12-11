import { Prisma, PrismaClient } from "@prisma/client";
import { Express } from "express";

const prisma = new PrismaClient();

export const userController = (app: Express) => {
  app.post(`/signup`, async (req, res) => {
    const { name, email } = req.body;
    const password = req.body.password;
    try {
      if (password.trim().length < 4) throw new Error("Invalid password");
      const result = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      res.json(result);
    } catch (e) {
      res.status(500).send("error, unable to create new user");
    }
  });

  app.get("/users", async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (e) {
      console.log({ error: e });
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

import { PrismaClient } from "@prisma/client";
import { CreateUserRequest } from "../types";

export const CreateUser = async (
  req: CreateUserRequest,
  prisma: PrismaClient
) => {
  const result = await prisma.user.create({ data: req });
  return result;
};

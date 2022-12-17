import { prisma } from "../../prisma/client";
import { CreateUserRequest } from "../../../types";

export const CreateUser = async (req: CreateUserRequest) => {
  const result = await prisma.user.create({ data: req });
  return result;
};

import { Response } from "express";

export const sendError = (error: any, res: Response) => {
  console.log({ error });
  res.status(500).send("help");
};

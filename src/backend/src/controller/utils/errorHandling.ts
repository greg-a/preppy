import { Response } from "express";

export const sendError = (error: any, res: Response) => {
  res.status(500).send("help");
};

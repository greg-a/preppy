import { RequestHandler } from "express";
import { createHmac } from "crypto";
import * as jwt from "jsonwebtoken";
import { UserAuthInfo } from "../../../../types";

const tokenSecret = process.env.TOKEN_SECRET;

export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization-jwt"];
  const token =
    authHeader && typeof authHeader === "string" && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);
  if (!tokenSecret)
    throw Error(".env file is missing tokenSecret, see envExample");

  jwt.verify(token, tokenSecret, (err, jwtRes) => {
    if (err) {
      return res.status(412).send(err.message);
    }

    if (jwtRes && typeof jwtRes === "object" && "id" in jwtRes) {
      req.user = {
        token,
        id: jwtRes.id,
        name: jwtRes.name,
        email: jwtRes.email,
      };
    } else {
      return res.status(500).send("Server error");
    }

    next();
  });
};

export const generateHashedPassword = (password: string) => {
  if (!tokenSecret)
    throw Error(".env file is missing tokenSecret, see envExample");
  const hashedPassword = createHmac("sha256", tokenSecret)
    .update(password)
    .digest("hex");
  return hashedPassword;
};

export const generateAccessToken = (payload: UserAuthInfo) => {
  if (!tokenSecret)
    throw Error(".env file is missing tokenSecret, see envExample");
  const token = jwt.sign(payload, tokenSecret);
  return token;
};

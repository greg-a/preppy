import { Express } from "express";
import { LoginRequest } from "../../../types";
import { prisma } from "../../prisma/client";
import { ReqBody } from "../types";
import { sendError } from "./utils/errorHandling";

const rootURL = "/api/login/";

export const LoginController = (app: Express) => {
  app.post(rootURL, async (req: ReqBody<LoginRequest>, res) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const results = await prisma.user.findFirstOrThrow({
          where: { email, password },
        });
        res.json(results);
      } catch (error) {
        sendError(error, res);
      }
    } else res.status(400).send("username or password is missing");
  });

  // app.get(`${rootURL}token/`, authenticateToken, async (req, res) => {
  //   try {
  //     const results = await Users.getUser(
  //       req.user.id,
  //       queryHelpers.attributes.userWithNotificationToken
  //     );
  //     const { notification_token, ...data } = results;
  //     res.json({
  //       ...data,
  //       hasNotificationToken: !!notification_token,
  //     });
  //   } catch (error) {
  //     sendError(error, res);
  //   }
  // });

  // app.get("/api/logout", authenticateToken, async (req, res) => {
  //   try {
  //     await Users.logout(req.user.id);
  //     res.sendStatus(200);
  //   } catch (error) {
  //     sendError(error, res);
  //   }
  // });
};

import { controller } from "./controller";

const express = require("express");
export const app = express();

app.use(express.json());

controller(app);

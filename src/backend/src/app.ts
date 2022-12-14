import { controller } from "./controller";

const express = require("express");
export const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

controller(app);

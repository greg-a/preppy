import { controller } from "./controller";

const express = require("express");
const app = express();

app.use(express.json());

controller(app);

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);

module.exports = app;

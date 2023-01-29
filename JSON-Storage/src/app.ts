import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import jsonDataRouter from "./json-data-router";
import tokenRouter from "./tokens-router";
import { handleError } from "./middleware/errors-middleware";
import { PORT } from "./constants";

const app: Express = express();

app.use(bodyParser.json());
app.use("/defaultRoute", jsonDataRouter);
app.use(tokenRouter);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

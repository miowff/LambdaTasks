import express, { Express } from "express";
import bodyParser from "body-parser";
import constants from "./constants";
import defaultRouter from "./router";
import mongoose from "mongoose";
import { handleError } from "./middleware/errorsMiddleware";

const app: Express = express();

mongoose.connect(constants.DB_CONNECTION_STRING + constants.DB_NAME);

app.use(bodyParser.json());
app.use("/", defaultRouter);
app.use(handleError);

app.listen(constants.PORT, () => {
  console.log(`Server started on port ${constants.PORT}`);
});

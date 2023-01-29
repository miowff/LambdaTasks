import Router from "express";
import urlsController from "./controllers/UrlsController";
import { body } from "express-validator";

const defaultRouter = Router();

defaultRouter.post(
  "/shortUrl",
  body("url").exists().isURL(),
  urlsController.shortUrl
);
defaultRouter.get("/:shortedUrl", urlsController.getUrl);

export default defaultRouter;

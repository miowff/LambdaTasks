import Router from "express";
import authorizationController from "./controllers/authorizationController.js";
import {
  checkAuthToken,
  checkRefreshToken,
} from "./middleware/authenticationMiddleware.js";
import { body } from "express-validator";

const router = new Router();

router.post(
  "/sign_up",
  body("email").isEmail(),
  authorizationController.signUp
);
router.post("/login", authorizationController.login);
router.get("/me", checkAuthToken, authorizationController.getMe);
router.post("/refresh", checkRefreshToken, authorizationController.refresh);

export default router;

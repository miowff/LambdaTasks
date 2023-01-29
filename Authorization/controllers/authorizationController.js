import { UserModel } from "../models/UserModel.js";
import usersService from "../services/usersService.js";
import { validationResult } from "express-validator";
import { ApiError } from "../exeptions/apiError.js";

class AuthorizationController {
  async signUp(req, res, next) {
    try {
      const validationErorrs = validationResult(req);
      if (!validationErorrs.isEmpty()) {
        return next(
          ApiError.BadRequest("Validation error", validationErorrs.array())
        );
      }
      const requestBody = req.body;
      const { email, password } = requestBody;
      const user = new UserModel(email, password);
      const result = await usersService.registerUser(user);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const requestBody = req.body;
      const { email, password } = requestBody;
      const userLoginModel = new UserModel(email, password);
      const result = await usersService.loginUser(userLoginModel);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const result = await usersService.refresh(req.refreshToken);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getMe(req, res, next) {
    try {
      const userData = usersService.me(req.token);
      res.json(userData);
    } catch (err) {
      next(err);
    }
  }
}
const authorizationController = new AuthorizationController();
export default authorizationController;

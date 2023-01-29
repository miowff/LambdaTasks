import { NextFunction, Request, Response } from "express";
import jsonStorageService from "../services/jsonStorageService";
import { UserJsonData } from "../models/UserJsonDataModel";
import { tokenValidator } from "../services/token-validator";

class JsonStorageController {
  async addData(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"] as string;
      const decodedToken = tokenValidator(token);
      const email = decodedToken["userEmail"];
      const requestBody = req.body;
      const requestParameters = req.params;
      const userData: UserJsonData = {
        userUrl: requestParameters.userRoute,
        jsonData: requestBody,
        email,
      };
      const result = await jsonStorageService.addUserDataToDbAsync(userData);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  async getData(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"] as string;
      const decodedToken = tokenValidator(token);
      const email = decodedToken["userEmail"];
      const requestParameters = req.params;
      const data = await jsonStorageService.getUserDataFromDbAsync(
        requestParameters.userRoute,
        email
      );
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  async updateData(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"] as string;
      const decodedToken = tokenValidator(token);
      const email = decodedToken["userEmail"];
      const requestParameters = req.params;
      const userData: UserJsonData = {
        userUrl: requestParameters.userRoute,
        jsonData: req.body,
        email,
      };
      await jsonStorageService.updateDataAsync(userData);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
  async deleteData(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"] as string;
      const decodedToken = tokenValidator(token);
      const email = decodedToken["userEmail"];
      const requestParameters = req.params;
      const result = await jsonStorageService.deleteData(
        requestParameters.userRoute,
        email
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const jsonStorageController = new JsonStorageController();
export default jsonStorageController;

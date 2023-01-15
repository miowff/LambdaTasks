import { NextFunction,Request,Response } from "express";
import jsonStorageService from '../services/jsonStorageService';
import {UserJsonData} from '../models/UserJsonDataModel';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "../constants";
import { tokenValidator } from "../services/token-validator";

class JsonStorageController
{
    async addData(req:Request,res:Response,next:NextFunction)
    {
        try
        {
            const token = req.headers['authorization'] as string;
            let decodedToken = tokenValidator(token);
            let email = decodedToken['userEmail'];
            const userData:UserJsonData = {userUrl:req.params.userRoute,jsonData:req.body,email};
            const result = await jsonStorageService.addUserDataToDbAsync(userData);
            res.status(200).json(result);
        }
        catch(err)
        {
            next(err);
        }
    }
    async getData(req:Request,res:Response,next:NextFunction)
    {
       try
       {
        const token = req.headers['authorization'] as string;
        let decodedToken = tokenValidator(token);
        let email = decodedToken['userEmail'];
        const url = req.params.userRoute;
        const data = await jsonStorageService.getUserDataFromDbAsync(url,email);
        res.status(200).json(data);
       }
       catch(err)
       {
            next(err);
       }
    }
    async updateData(req:Request,res:Response,next:NextFunction)
    {
        try
        {
            const token = req.headers['authorization'] as string;
            let decodedToken = tokenValidator(token);
            let email = decodedToken['userEmail'];
            const userData:UserJsonData = {userUrl:req.params.userRoute,jsonData:req.body,email};
            await jsonStorageService.updateDataAsync(userData);
            res.status(200).json();
        }
        catch(err)
        {
            next(err);
        }
    }
}

const jsonStorageController = new JsonStorageController();
export default jsonStorageController;
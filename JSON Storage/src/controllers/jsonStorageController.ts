import { NextFunction,Request,Response } from "express";
import jsonStorageService from '../services/jsonStorageService';
import {UserJsonData} from '../models/UserJsonDataModel';

class JsonStorageController
{
    async addData(req:Request,res:Response,next:NextFunction)
    {
        try
        {
            var userData:UserJsonData = {userUrl:req.params.userRoute,jsonData:req.body};
            var result = await jsonStorageService.addUserDataToDbAsync(userData);
            res.json(result);
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
        var url = req.params.userRoute;
        var data = await jsonStorageService.getUserDataFromDbAsync(url);
        res.json(data);
       }
       catch(err)
       {
            next(err);
       }
    }
}

const jsonStorageController = new JsonStorageController();
export default jsonStorageController;
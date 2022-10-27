import { NextFunction,Request,Response } from "express";
import currenciesService from "../services/currenciesService";

class CurrenciesController
{
    async getAllAveliableCurrencies(req:Request,res:Response,next:NextFunction)
    {
        try
        {
            const result = await currenciesService.getAllCurrencies();
            res.json(result);
        }
        catch(err)
        {
            next(err);
        }
    }
}

const currenciesController = new CurrenciesController();
export default currenciesController;
import { NextFunction,Request,Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../constants";

class TokenController
{
    async createToken(req:Request,res:Response,next:NextFunction)
    {
        try
        {
            let userEmail = req.body.userEmail;
            let token = jwt.sign({userEmail:userEmail},JWT_SECRET,{algorithm:'HS256',expiresIn:45});
            
            res.json(token);
        }
        catch(err)
        {
            next(err);
        }
    }
}

const tokenController = new TokenController();
export default tokenController;
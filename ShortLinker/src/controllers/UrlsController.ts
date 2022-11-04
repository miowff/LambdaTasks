import { NextFunction,Request,Response } from "express";
import ShortUrl from '../models/url';
import {validationResult} from 'express-validator';

class UrlsController
{
    async shortUrl(req:Request,res:Response,next:NextFunction)
    {
        try
        {   
            var validationErorrs = validationResult(req);
            if(!validationErorrs.isEmpty())
            {
                return res.status(400).send(`Json body validation error. ${JSON.stringify(validationErorrs)}`);
            }
            const dbRespocne = await ShortUrl.create({fullUrlPath:req.body.url});
            res.status(200).json({shortedUrl:`${dbRespocne.hostUrl}/${dbRespocne.shortUrlPath}`});
        }
        catch(err)
        {
            next(err);
        }
    }
    async getUrl(req:Request,res:Response,next:NextFunction)
    {
        try
        {
            const shortedUrl = await ShortUrl.findOne({shortUrlPath:req.params.shortedUrl});
            console.log(shortedUrl);
            if (shortedUrl == null)
            {
                return res.status(400).json({error:"Short link not found!"});
            }
            res.redirect(shortedUrl.fullUrlPath);
        }
        catch(err)
        {
            next(err);
        }
    }
}

const urlsController = new UrlsController();
export default urlsController;
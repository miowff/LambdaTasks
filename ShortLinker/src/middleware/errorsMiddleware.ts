import {Request, Response } from "express";

export function handleError(error:Error,req:Request,res:Response)
{
    return res.status(500).json({message:`Error! ${error.message}`});
}

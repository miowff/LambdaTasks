import { NextFunction,Request,Response } from "express";
import botCommandsHandler from "../services/bot-commands-handler";
import botCallbackQueriesHandler from "../services/bot-callback-queries-handler";

class TelegramRequestsController
{
    async handleRequest(req:Request,res:Response,next:NextFunction)
    {
        try
        {
            let webhookData = req.body.message;
            if(!webhookData)
            {
                webhookData = req.body.callback_query;
                if(!webhookData)
                {
                    return res.send();
                }
                await botCallbackQueriesHandler.handleCallbackQueryAsync(webhookData);
                return res.send();
            }
            await botCommandsHandler.handleCommandAsync(webhookData);
            return res.send();
        }
        catch(err)
        {
            next(err);
        }
    }
}
const telegramRequestsController = new TelegramRequestsController();
export default telegramRequestsController;
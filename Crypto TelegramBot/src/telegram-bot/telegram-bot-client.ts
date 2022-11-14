import constants from "../constants";
import TelegramBot, { SendMessageOptions} from 'node-telegram-bot-api'
import { KEYBOARDS } from "./keyboards";

class TelegramBotClient
{
    private telegramBot:TelegramBot;

    constructor()
    {
        this.telegramBot = new TelegramBot(constants.BOT_TOKEN);
    }
    async setWebhook()
    {
        try
        {
            await this.telegramBot.setWebHook(constants.WEBHOOK_URL);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async sendWelcomeMessage(chatId:number)
    {
        try
        {
            const options:SendMessageOptions = 
            {
                reply_markup: 
                {
                    resize_keyboard: true,
                    keyboard: KEYBOARDS.menu
                }
            };
            this.telegramBot.sendMessage(chatId,"Приветствую,я помогу тебе отслежтвать цену криптовалют!",options);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async sendMessage(chatId:number,text:string,options?:SendMessageOptions)
    {
        try
        {
            this.telegramBot.sendMessage(chatId,text,options);
        }
        catch(err)
        {
            console.log(err)
        }
    }
    async deleteMessage(chatId:number,messageId:number)
    {
        this.telegramBot.deleteMessage(chatId,messageId.toString());
    }
}

const telegramBotClient = new TelegramBotClient();
export default telegramBotClient;
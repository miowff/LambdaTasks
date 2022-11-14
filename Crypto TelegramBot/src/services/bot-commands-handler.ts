import telegramBotClient from "../telegram-bot/telegram-bot-client";
import usersService from "./users-service";
import currenciesRepository from "../database/repositories/currencies-repository";
import { UserModel } from "../models/user-model";
import BUTTONS from "../telegram-bot/buttons";
import {createInlineKeyboardForCurrencies} from '../telegram-bot/inline-keyboard';
import { SendMessageOptions,Message  } from "node-telegram-bot-api";

class BotCommandsHandler
{
    async handleCommandAsync(message:Message)
    {
        const text = message.text;
        const chatId = message.chat.id;
        await telegramBotClient.deleteMessage(chatId,message.message_id);
        switch(text)
        {
            case '/start':
            {
                const user = message.from;
                console.log(message.from);
                if(!user)
                {
                    throw new Error("No user");  
                }
                const userModel:UserModel = 
                {
                    Id:user.id,
                    Name:user.first_name,
                    Nickname:user.username
                }
                await usersService.addNewUser(userModel);
                return telegramBotClient.sendWelcomeMessage(chatId);   
            }
            case BUTTONS.AVELIABLE_CURRENCIES.text:
            {
                const avaliableCurrencies = await currenciesRepository.getAllAsync();
                const options:SendMessageOptions = 
                {
                    reply_markup: 
                    {
                        inline_keyboard:createInlineKeyboardForCurrencies(avaliableCurrencies,4)
                    }
                };
                return telegramBotClient.sendMessage(chatId,"Доступные криптовалюты:",options);
            }
            case BUTTONS.HELP.text:
            {
                return telegramBotClient.sendMessage(chatId,"Список доступных комманд");
            }
            default:
            return telegramBotClient.sendMessage(chatId,"Неизвестная команда");
        }
    }
}


const botCommandsHandler = new BotCommandsHandler();
export default botCommandsHandler;






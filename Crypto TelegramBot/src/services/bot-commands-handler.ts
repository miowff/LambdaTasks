import telegramBotClient from "../telegram-bot/telegram-bot-client";
import usersService from "./users-service";
import { UserModel } from "../models/user-model";
import BUTTONS from "../telegram-bot/buttons";
import inlineKeyboardService from "../telegram-bot/inline-keyboard";
import { SendMessageOptions,Message  } from "node-telegram-bot-api";
import usersRepository from "../database/repositories/users-repository";
import currenciesRepository from "../database/repositories/currencies-repository";

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
                const currencies = await currenciesRepository.getAllAsync();
                inlineKeyboardService.returnRoute='/BackToMenu';
                const options:SendMessageOptions = {reply_markup: {inline_keyboard:inlineKeyboardService.createInlineKeyboard(currencies,4)}};
                return telegramBotClient.sendMessage(chatId,"Доступные криптовалюты:",options);
            }
            case BUTTONS.HELP.text:
            {
                return telegramBotClient.sendMessage(chatId,"Список доступных комманд");
            }
            case BUTTONS.FAVORITES.text:
            {
                const favouriteCurencies = await usersRepository.getFavouriteCurrenciesAsync(chatId);
                inlineKeyboardService.returnRoute='/BackToFavourites';
                const options:SendMessageOptions = {reply_markup:{inline_keyboard: inlineKeyboardService.createInlineKeyboard(favouriteCurencies,4)}};
                return telegramBotClient.sendMessage(chatId,"Ваши избранные криптовалюты",options)
            }
            default:
            return telegramBotClient.sendMessage(chatId,"Неизвестная команда");
        }
    }
}


const botCommandsHandler = new BotCommandsHandler();
export default botCommandsHandler;






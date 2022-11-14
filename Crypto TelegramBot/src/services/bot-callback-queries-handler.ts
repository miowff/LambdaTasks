import {CallbackQuery, SendMessageOptions} from 'node-telegram-bot-api'
import currenciesRepository from '../database/repositories/currencies-repository';
import { CallbackDataQuery } from '../models/dtos/callback-data-quey';
import { PriceDataModel } from '../models/dtos/price-data-model-dto';
import telegramBotClient from '../telegram-bot/telegram-bot-client';

class BotCallbackQueriesHandler
{
    async handleCallbackQueryAsync(callbackQuery:CallbackQuery)
    {
        const message = callbackQuery.message;
        if(!message)
        {
            return;
        }
        const messageId = message.message_id 
        const chatId = message.chat.id;

        await telegramBotClient.deleteMessage(chatId,messageId);

        const query:CallbackDataQuery = JSON.parse(callbackQuery.data as string);
        switch(query.action)
        {
            case '/Info':
            {
                const currencyId = query.currencyId as string
                const currency = await currenciesRepository.getById(currencyId);
                const priceData = new PriceDataModel(currency.Id,currency.CurrencyCode,"99999")

                const options:SendMessageOptions = 
                {
                reply_markup: 
                    {
                        inline_keyboard:[[{text:'Назад',callback_data:JSON.stringify(new CallbackDataQuery('Back'))},
                        {text:'Детали',callback_data:JSON.stringify(new CallbackDataQuery('/Details',currencyId))},
                        {text:'В избранное',callback_data:JSON.stringify(new CallbackDataQuery('/AddToFavourite',currencyId))}]]
                    }
                };

                return await telegramBotClient.sendMessage(chatId,priceData.toString(),options);
            }
        }
        return;
    }
}


const botCallbackQueriesHandler = new BotCallbackQueriesHandler();
export default botCallbackQueriesHandler;
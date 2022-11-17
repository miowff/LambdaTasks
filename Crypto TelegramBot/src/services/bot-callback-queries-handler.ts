import {CallbackQuery, SendMessageOptions} from 'node-telegram-bot-api'
import currenciesRepository from '../database/repositories/currencies-repository';
import { CallbackDataQuery } from '../models/dtos/callback-data-quey';
import { PriceDataModel } from '../models/dtos/price-data-model-dto';
import telegramBotClient from '../telegram-bot/telegram-bot-client';
import { PriceDataDetails } from '../models/dtos/price-data-details-dto';
import inlineKeyboardService from '../telegram-bot/inline-keyboard';
import usersRepository from '../database/repositories/users-repository';

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
        const query:CallbackDataQuery = JSON.parse(callbackQuery.data as string);
        if(!query.currencyId)
        {
            switch(query.action)
            {
                case '/BackToMenu':
                    {
                        const aveliableCurrencies = await currenciesRepository.getAllAsync();
                        const options:SendMessageOptions =
                        {reply_markup:{inline_keyboard:inlineKeyboardService.createInlineKeyboard(aveliableCurrencies,4)}}
                        await telegramBotClient.deleteMessage(chatId,messageId);
                        return await telegramBotClient.sendMessage(chatId,"Доступные криптовалюты",options);
                    }
                    case '/BackToFavourites':
                    {
                        const favouriteCurencies = await usersRepository.getFavouriteCurrenciesAsync(chatId);
                        const options:SendMessageOptions =
                        {reply_markup:{inline_keyboard:inlineKeyboardService.createInlineKeyboard(favouriteCurencies,4)}}
                        await telegramBotClient.deleteMessage(chatId,messageId);
                        return await telegramBotClient.sendMessage(chatId,"Избранное",options);
                    }
            }
        }

        const currencyId = query.currencyId as string
        const currency = await currenciesRepository.getById(currencyId);

        switch(query.action)
        {
            case '/Info':
            {
                const priceData = new PriceDataModel(currency.Id,currency.CurrencyCode,"99999")

                const isInFavourites = await currenciesRepository.isInFavouritesAsync(chatId,currency.Id);

                const options:SendMessageOptions = {reply_markup: {inline_keyboard:inlineKeyboardService.currencyInlineKeyboard(currency,isInFavourites)}};

                await telegramBotClient.deleteMessage(chatId,messageId);
                return await telegramBotClient.sendMessage(chatId,priceData.toString(),options);
            }
            case '/Details':
            {
                const priceDetails = new PriceDataDetails("99999","99999","99999","99999","99999","99999");
                const priceData = new PriceDataModel(currency.Id,currency.CurrencyCode,"99999",priceDetails);

                const options:SendMessageOptions = 
                {reply_markup: {inline_keyboard:[[{text:'Назад',callback_data:JSON.stringify(new CallbackDataQuery('/Info',currency.Id))}]]}};

                await telegramBotClient.deleteMessage(chatId,messageId);
                return await telegramBotClient.sendMessage(chatId,priceData.toString(),options);
            }
            case '/AddToFavourite':
            {
                await currenciesRepository.addToFavouritesAsync(chatId,currencyId);
                const priceData = new PriceDataModel(currency.Id,currency.CurrencyCode,"99999")

                const options:SendMessageOptions = {reply_markup: {inline_keyboard:inlineKeyboardService.currencyInlineKeyboard(currency,true)}};
                await telegramBotClient.deleteMessage(chatId,messageId);
                return await telegramBotClient.sendMessage(chatId,priceData.toString(),options);
            }
            case '/RemoveFromFavourites':
            {
                await usersRepository.removeCurrencyFromFavourites(currencyId,chatId);
                const priceData = new PriceDataModel(currency.Id,currency.CurrencyCode,"99999")

                const options:SendMessageOptions = {reply_markup: {inline_keyboard:inlineKeyboardService.currencyInlineKeyboard(currency,false)}};
                await telegramBotClient.deleteMessage(chatId,messageId);
                return await telegramBotClient.sendMessage(chatId,priceData.toString(),options);
            }
        }
        return;
    }
}


const botCallbackQueriesHandler = new BotCallbackQueriesHandler();
export default botCallbackQueriesHandler;
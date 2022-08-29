import TelegramBot from 'node-telegram-bot-api';
import {TELEGRAM_BOT_TOKEN} from '../tokens.js';
import { BUTTONS } from './keyboardButtons.js';
import { KEYBOARDS } from './keyboards.js';
import {forecastForThreeHoursAsync, forecastForSixHoursAsync,getCurrentWindData} from '../WeatherForecastModule/weatherForecast.js';
import {getExchangeRate} from '../CurrencyExchangeModule/interactExchangeRatesFile.js';
import { CahatIdStateDictionary } from './chatIdStateDictionary.js';
import { userState } from './userStates.js';

var chatIdState = new CahatIdStateDictionary();

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN,
{
    polling:
    {
        interval:300,
        autoStart:true,
        params:
        {
            timeout:10
        }
    }
});

 export async function botStart()
 {
    bot.on('message', message => 
    {
        var text = message.text;
        var chatId = message.chat.id;
        if(text === '/start')
        {
            chatIdState.add(chatId, userState.WatingForCityInput);
            bot.sendMessage(chatId,"Отправьте название своего города");
        }
        else
        {
            var state = chatIdState.findAt(chatId);
            if(state === userState.WatingForCityInput)
            {
                if(isUserMessageCanBeCityName(message))
                {
                    sendMessage(`Вы живете в городе ${text}.`,chatId,KEYBOARDS.home);
                    chatIdState.changeState(chatId,text);
                    return
                }
                return bot.sendMessage(chatId,"Отправьте корректное название города.");
            }
            else
            {
                switch(text)
                {
                    case '/start': return sendMessage(`Здравствуйте ${message.from.first_name}`,chatId,KEYBOARDS.home);
                    case BUTTONS.Home.currencyExchangeRates: return sendMessage('Выберите вариант',chatId,KEYBOARDS.currencyExchangeRates); 
                    case BUTTONS.CurrencyExchangeRates.EUR: return getExchangeRate('EUR').then(function(result)
                        {
                           return sendMessage(result,chatId,KEYBOARDS.currencyExchangeRates);
                        });
                    case BUTTONS.CurrencyExchangeRates.USD: return getExchangeRate('USD').then(function(result)
                        {
                           return sendMessage(result,chatId,KEYBOARDS.currencyExchangeRates);
                        });
                    case BUTTONS.Default.back: return sendMessage('Возвращаю в главное меню...',chatId,KEYBOARDS.home);
                    case BUTTONS.Home.weather: return sendMessage('Выберите вариант',chatId,KEYBOARDS.weather);
                    case BUTTONS.Weather.forecastForSixHours: var userCity = chatIdState.findAt(chatId);
                        return forecastForSixHoursAsync(userCity).then(function(result)
                            {
                                sendMessage(result,chatId,KEYBOARDS.weather);
                            });
                    case BUTTONS.Weather.forecastForThreeHours:var userCity = chatIdState.findAt(chatId);
                        return forecastForThreeHoursAsync(userCity).then(function(result)
                            {
                                sendMessage(result,chatId,KEYBOARDS.weather);
                            });
                    case BUTTONS.Weather.windData:var userCity = chatIdState.findAt(chatId);
                            return getCurrentWindData(userCity).then(function(result)
                            {
                                sendMessage(result,chatId,KEYBOARDS.weather);
                            })
                    case BUTTONS.Settings.changeCity:  
                        chatIdState.changeState(chatId,userState.WatingForCityInput);
                        return bot.sendMessage(chatId, 'Введите название города');
                }
            }
        }
    });
 }

 function isUserMessageCanBeCityName(message)
 {
    if(message.text)
    {
        return true;
    }
    return false;
 }

 function sendMessage(text,chatId,keyboard)
 {
    bot.sendMessage(chatId,text, {
        reply_markup:
        {
            keyboard:keyboard
        }
    });
 }
 
   
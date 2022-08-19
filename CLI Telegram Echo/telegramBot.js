import TelegramBot from 'node-telegram-bot-api';
import {getPhotoUrl} from './getPhoto.js';

const token = '5481589043:AAH8rfDusKv_aRMmcNX1mg7Zx-1xz4EqW-c';

const bot = new TelegramBot(token,{polling:true});

export function botStart()
{
    bot.on('message', message => 
    {
        var text = message.text;
        var chatId = message.chat.id;

        if(text === 'photo' || text === 'Photo' )
        {
            getPhotoUrl().then(function(result)
            {
                bot.sendPhoto(chatId,result)
            });
            
        }
        else
        {
            bot.sendMessage(chatId,"Вы написали:"+text);
        }
    });
}
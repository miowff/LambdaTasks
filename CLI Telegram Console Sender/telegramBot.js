import TelegramBot from 'node-telegram-bot-api';
import path from 'path';
import fs from 'fs';

const chatIdPath = path.join('chatId.txt');

const token = '5642301814:AAHiNKU_4dYz2spA6dDdWo-iORrf0rMq99U';

const bot = new TelegramBot(token);

const chatId = fs.readFileSync(chatIdPath,'utf-8', (err) =>
{
    if(err) throw err;
});

function setChatId()
{
    bot.startPolling();
    bot.onText(/\/start/, msg =>
    {
        fs.writeFileSync(chatIdPath,msg.chat.id.toString());
    });
    bot.stopPolling();
}

export function sendMessage(message)
{
    if(chatId == '')
    {
        setChatId();
        console.log("Chat id was updated, send request again");
        return;
    }
    bot.sendMessage(parseInt(chatId),message);
}

export function sendPicture(path)
{
    if(chatId == '')
    {
        setChatId();
        console.log("Chat id was updated, send request again");
        return;
    }
    bot.sendPhoto(parseInt(chatId),path);
}


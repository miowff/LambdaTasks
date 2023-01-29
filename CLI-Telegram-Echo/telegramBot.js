import TelegramBot from "node-telegram-bot-api";
import { getPhotoUrl } from "./getPhoto.js";
import { TELEGRAM_BOT_TOKEN } from "./constants.js";

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

export function botStart() {
  bot.on("message", (message) => {
    const text = message.text;
    const chatId = message.chat.id;

    if (text.toLowerCase() === "photo") {
      getPhotoUrl().then(function (result) {
        bot.sendPhoto(chatId, result);
        return;
      });
    } else {
      return bot.sendMessage(chatId, "Вы написали:" + text);
    }
  });
}

import TelegramBot from "node-telegram-bot-api";
import path from "path";
import fs from "fs";
import { TELEGRAM_BOT_TOKEN } from "./constants.js";

const chatIdPath = path.join("chatId.txt");

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);

const chatId = fs.readFileSync(chatIdPath, "utf-8", (err) => {
  if (err) throw err;
});

function setChatId() {
  bot.startPolling();
  bot.on("message", (msg) => {
    fs.writeFileSync(chatIdPath, msg.chat.id.toString());
  });
  bot.stopPolling();
}

export function sendMessage(message) {
  if (chatId === "") {
    setChatId();
    console.log("Chat id was updated, send request again");
    return;
  }
  bot.sendMessage(parseInt(chatId), message);
}

export function sendPicture(path) {
  if (chatId === "") {
    setChatId();
    console.log("Chat id was updated, send request again");
    return;
  }
  bot.sendPhoto(parseInt(chatId), path);
}

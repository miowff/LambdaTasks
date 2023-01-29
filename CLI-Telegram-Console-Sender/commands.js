import { Command } from "commander";
import { sendMessage, sendPicture } from "./telegramBot.js";

const program = new Command();

program
  .name("Telegram-console-sender")
  .description("Send somethig to bot from console");

program
  .command("message")
  .description("Sends message to telegram bot")
  .argument("<string>", "Message to send")
  .action((str) => {
    sendMessage(str);
  });

program
  .command("photo")
  .description(
    "Sends photo to telegram bot.Type path as argument or drag and drop photo."
  )
  .argument("<path>", "Path to photo")
  .action((path) => {
    sendPicture(path);
  });

export function readCommand() {
  program.parse();
}

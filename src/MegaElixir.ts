import { Message, MessageReactionAdd, Ready } from "./events";
import * as Commands from "./commands";
import Bot from "./Bot";
import Command from "commands/Command";

export default class MegaElixir extends Bot {
    public main(bot: Bot): void {
        for (const command in Commands) {
            const classCommand = new Commands[command](bot) as Command;
            bot.commands.set(classCommand.name, classCommand);
        }

        bot.client.on("ready", () => Ready(bot));
        bot.client.on("message", (msg) => Message(bot, msg));
        bot.client.on("messageReactionAdd", MessageReactionAdd);

        /* ========================================================== */
        /*                           LOGS                             */
        /* ========================================================== */
        process.on("warn", (warn: Error) => bot.log(warn.stack || warn.toString(), true));
        process.on("unhandledRejection", (error: Error) => bot.log(error.stack || error.toString(), true));
        process.on("uncaughtException", (error: Error) => bot.log(error.stack || error.toString(), true));

        bot.client.on("error", (error: Error) => bot.log(error.stack || error.toString(), true));
        bot.client.on("warn", (warn: string) => bot.log(warn, true));
        bot.client.on("invalidated", () => bot.log("Error INVALIDATED", true));
    }
}

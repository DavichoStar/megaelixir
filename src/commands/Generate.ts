import { Message, MessageEmbed } from "discord.js";
import Command from "./Command";

export class Generate extends Command {
    readonly name = "generate";
    readonly alias = [];
    readonly args = true;
    readonly permission = "ADMINISTRATOR";

    executed(message: Message, emojiStr: string | undefined, ...args: string[]): void {
        const emojiRegExp = /<a?:[^:]+:(\d+)>/gm;
        const emoji = emojiStr ? message.guild?.emojis.cache.get(emojiRegExp.exec(emojiStr)![1]) : undefined;
        const title = args.length > 0 ? args.join(" ") : "Creación de pedido";
        message.delete();

        message.channel
            .send(
                new MessageEmbed()
                    .setTitle(title)
                    .setDescription(`Para crear una conversación sobre tu pedido reacciona aquí. ${emoji || "📩"}`)
                    .setColor(0x6666ff)
            )
            .then((msg) => msg.react(emoji || "📩"));
    }
}

import { GuildEmoji, Message, MessageEmbed, MessageEmbedOptions, TextChannel } from "discord.js";
import Command from "./Command";
const emojiRegExp = /<a?:[^:]+:(\d+)>/gm;

export class Generate extends Command {
    readonly name = "generate";
    readonly alias = [];
    readonly args = true;
    readonly permission = "ADMINISTRATOR";

    async executed(message: Message, emojiStr: string, canalStr: string, ...args: string[]): Promise<any> {
        const emojiID = emojiRegExp.exec(emojiStr);
        let emoji: GuildEmoji | string | undefined = emojiStr ? message.guild?.emojis.cache.get(emojiID && emojiID[1] ? emojiID[1] : "") : undefined;
        if (message.deletable) message.delete();

        let canal: TextChannel | undefined | null = message.channel as TextChannel;
        if (!emoji) emoji = "📩";
        if (!isNaN(Number(canalStr))) canal = message.client.channels.cache.get(canalStr) as TextChannel | undefined;
        else args = [canalStr, ...args];

        if (!canal && !isNaN(Number(canalStr)))
            try {
                canal = (await message.client.channels.fetch(canalStr)) as TextChannel;
            } catch (_) {
                null;
            }
        if (!canal) return message.channel.send("`❌|` Canal no encontrado.");

        let mensajeEmbed: MessageEmbed | MessageEmbedOptions | undefined;
        try {
            mensajeEmbed = JSON.parse(args.join(" "));
        } catch (error) {
            return message.channel.send("`❌|` Esctructura no válida.");
        }

        return canal
            .send(new MessageEmbed(mensajeEmbed))
            .then((msg) => {
                msg.react(emoji!);
                if (message.channel.id != canal!.id) message.channel.send("`✅|` Mensaje enviado al canal.");
            })
            .catch((error: Error) => message.channel.send(`\`❌|\` Error al mandar el mensaje: \`\`\`${error.stack || error.message}\`\`\``));
    }
}

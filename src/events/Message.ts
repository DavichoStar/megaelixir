import { Message as MessageDiscord } from "discord.js";
import Bot from "Bot";

export async function Message(bot: Bot, msg: MessageDiscord): Promise<any> {
    if (msg.author.bot) return;
    if (msg.channel.type === "dm" || !msg.guild) return;
    if (!msg.content.startsWith(process.env.PREFIX_BOT!)) return;

    const args = msg.content
        .slice(process.env.PREFIX_BOT!.length) // se retira el prefijo del mensaje.
        .trim() // se limpian los espacios al inicio y al final del string.
        .split(/ /g) // se separa los argumentos por cada espacio en el mensaje.
        .filter((e) => e); // se filtran los argumentos vacios.
    const cmd = args
        .shift()! // se retira el comando.
        .toLowerCase()
        // vv| Quita los valores especiales como acentos pero no la Ñ
        .normalize("NFD")
        // eslint-disable-next-line no-misleading-character-class
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
        .normalize()!;

    const command = bot.commands.get(cmd) || bot.commands.find((comando) => comando.alias.includes(cmd));

    if (!command) return undefined;

    bot.log(`Comando ${command.name} ejecutado por ${msg.author.tag} en ${msg.channel.name} (${msg.guild.name})`);
    command.notified(msg, ...args);
}

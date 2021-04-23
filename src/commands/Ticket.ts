import { Message, MessageEmbed, TextChannel } from "discord.js";
import Command from "./Command";

export class Ticket extends Command {
    readonly name = "ticket";
    readonly alias = [];
    readonly args = true;
    readonly permission = "ADMINISTRATOR";

    async executed(message: Message, modo: string | undefined, userStr: string): Promise<any> {
        if (!modo || !["add", "remove"].includes(modo.toLowerCase())) return message.channel.send("Necesitas especificar una opción entre `add` o `remove`.");

        const member = message.guild!.members.resolve(userStr) || message.mentions.members!.first();
        const ticketChannel = (message.mentions.channels.first() as TextChannel | undefined) || (message.channel as TextChannel);
        if (!member) return message.channel.send("Menciona un miembro válido o coloca su ID para agregarlo al ticket.");

        ticketChannel.createOverwrite(member.id, {
            SEND_MESSAGES: modo === "add" ? true : false,
            VIEW_CHANNEL: modo === "add" ? true : false
        });

        message.channel.send(
            new MessageEmbed()
                .setDescription(`${member} ${modo === "add" ? "ha sido añadido al ticket" : "ha sido removido del ticket"} ${ticketChannel}.`)
                .setColor(modo === "add" ? 0x66ff66 : 0xff6666)
                .setTimestamp()
        );
    }
}

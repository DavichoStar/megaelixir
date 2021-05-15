import { Message, MessageEmbed, TextChannel } from "discord.js";
import Command from "./Command";

export class Delete extends Command {
    readonly name = "delete";
    readonly alias = ["eliminar"];
    readonly args = false;

    executed(message: Message): any {
        if (!message.member?.roles.cache.has("701573439101730856")) return;
        const ticketChannel = (message.mentions.channels.first() as TextChannel | undefined) || (message.channel as TextChannel);

        message.delete();
        if (!/.+-\d+/gi.test(ticketChannel.name) || !ticketChannel.name.startsWith("closed-"))
            return message.channel.send(new MessageEmbed().setDescription("Canal inválido para eliminar como ticket.").setColor(0xff6666).setTimestamp());

        ticketChannel
            .send(new MessageEmbed().setDescription("Eliminando ticket en 5 segundos...").setColor(0xef5350).setTimestamp())
            .then(() => setTimeout(() => ticketChannel.delete("Ticket Cerrado"), 5_000));
    }
}

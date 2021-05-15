import { Message, MessageEmbed, TextChannel } from "discord.js";
import Command from "./Command";

export class Close extends Command {
    readonly name = "close";
    readonly alias = ["cerrar"];
    readonly args = false;

    async executed(message: Message): Promise<any> {
        const ticketChannel = (message.mentions.channels.first() as TextChannel | undefined) || (message.channel as TextChannel);

        message.delete();
        if (!/.+-\d+/gi.test(ticketChannel.name))
            return message.channel.send(new MessageEmbed().setDescription("Canal inválido para cerrar como ticket.").setColor(0xff6666).setTimestamp());

        ticketChannel.send(new MessageEmbed().setDescription("Cerrando ticket...").setColor(0xffff66).setTimestamp()).then(async (msg) => {
            ticketChannel.permissionOverwrites.forEach((p) => {
                if (p.id === message.client.user!.id || p.id === message.guild!.id) return;
                ticketChannel.createOverwrite(p.id, {
                    SEND_MESSAGES: null,
                    VIEW_CHANNEL: null
                });
            });
            await ticketChannel.setName(`closed-${(message.channel as TextChannel).name.split("-")[1]}`);

            return msg.edit(
                new MessageEmbed()
                    .setDescription(`Ticket cerrado por ${message.author}.`)
                    .addField("Save", "📑 Usalo para generar el transcript.")
                    .addField("Open", "🔓 Usalo para reabrir el ticket.")
                    .addField("Delete", "⛔ Usalo para eliminar el ticket.")
                    .setColor(0xffff66)
                    .setTimestamp()
            );
        });
    }
}

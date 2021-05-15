import { Message, MessageEmbed, TextChannel } from "discord.js";
import Command from "./Command";

export class Open extends Command {
    readonly name = "open";
    readonly alias = ["abrir"];
    readonly args = false;

    async executed(message: Message): Promise<any> {
        if (!message.member?.roles.cache.has("701573439101730856")) return;
        const ticketChannel = (message.mentions.channels.first() as TextChannel | undefined) || (message.channel as TextChannel);

        message.delete();
        if (!ticketChannel.name.startsWith("closed-"))
            return message.channel.send(new MessageEmbed().setDescription("Canal inválido para abrir como ticket.").setColor(0xff6666).setTimestamp());

        ticketChannel.send(new MessageEmbed().setDescription("Abriendo ticket...").setColor(0xffff66).setTimestamp()).then(async (msg) => {
            ticketChannel.permissionOverwrites.forEach((p) => {
                if (p.id === message.client.user!.id || p.id === message.guild!.id) return;
                ticketChannel.createOverwrite(p.id, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                });
            });
            await ticketChannel.setName(`ticket-${(message.channel as TextChannel).name.split("-")[1]}`);

            return msg.edit(new MessageEmbed().setDescription(`Ticket abierto por ${message.author}.`).setColor(0x1ec45c).setTimestamp());
        });
    }
}

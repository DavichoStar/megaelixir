import { Message, MessageAttachment, MessageEmbed, TextChannel } from "discord.js";
import Command from "./Command";
import Transcript from "../Transcript";

export class Close extends Command {
    readonly name = "close";
    readonly alias = ["cerrar"];
    readonly args = false;

    async executed(message: Message): Promise<any> {
        const ticketChannel = (message.mentions.channels.first() as TextChannel | undefined) || (message.channel as TextChannel);

        if (!/.+-\d+/gi.test(ticketChannel.name))
            return message.channel.send(new MessageEmbed().setDescription("Canal inválido para cerrar como ticket.").setColor(0xff6666).setTimestamp());
        await ticketChannel.send(new MessageEmbed().setDescription("Cerrando ticket...").setColor(0xffff66).setTimestamp());
        ticketChannel.permissionOverwrites.forEach((p) => {
            if (p.id === message.client.user!.id || p.id === message.guild!.id) return;
            ticketChannel.createOverwrite(p.id, {
                SEND_MESSAGES: null,
                VIEW_CHANNEL: null
            });
        });
        const messages = await ticketChannel.messages.fetch({ limit: 100 });
        ticketChannel.send(
            new MessageAttachment(
                Buffer.from(Transcript(messages.array().sort((a, b) => (a.createdAt as any) - (b.createdAt as any)))),
                `${(message.channel as TextChannel).name}.html`
            )
        );
        ticketChannel.setName(`closed-${(message.channel as TextChannel).name.split("-")[1]}`);
        return message.channel.send(
            new MessageEmbed().setDescription(`Se ha cerrado el ticket ${ticketChannel} correctamente.`).setColor(0xffff66).setTimestamp()
        );
    }
}

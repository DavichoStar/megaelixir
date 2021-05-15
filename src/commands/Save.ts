import { Message, MessageAttachment, MessageEmbed, TextChannel } from "discord.js";
import Transcript from "../Transcript";
import Command from "./Command";

export class Save extends Command {
    readonly name = "save";
    readonly alias = ["guardar", "transcript"];
    readonly args = false;

    async executed(message: Message): Promise<any> {
        if (!message.member?.roles.cache.has("701573439101730856")) return;
        message.delete();
        const ticketChannel = (message.mentions.channels.first() as TextChannel | undefined) || (message.channel as TextChannel);

        if (!/.+-\d+/gi.test(ticketChannel.name) || !ticketChannel.name.startsWith("closed-"))
            return message.channel.send(
                new MessageEmbed().setDescription("Canal inválido para hacer transcript como ticket.").setColor(0xff6666).setTimestamp()
            );

        const messages = await ticketChannel.messages.fetch({ limit: 100 });
        ticketChannel
            .send(
                new MessageAttachment(
                    Buffer.from(Transcript(messages.array().sort((a, b) => (a.createdAt as any) - (b.createdAt as any)))),
                    `${(message.channel as TextChannel).name}.html`
                )
            )
            .then((msg) => {
                msg.attachments.first()?.url;
                message.channel.send(
                    new MessageEmbed()
                        .setDescription("Transcript guardado")
                        .addField("Enlace Directo", `[Clic aquí](https://tickettool.xyz/direct?url=${msg.attachments.first()?.url})`)
                        .setColor(0xffff66)
                );
            });
    }
}

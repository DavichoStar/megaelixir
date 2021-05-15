import { Message, MessageEmbed } from "discord.js";
import Command from "./Command";

export class Help extends Command {
    readonly name = "help";
    readonly alias = ["ayuda"];
    readonly args = false;

    async executed(message: Message): Promise<any> {
        message.channel.send(
            new MessageEmbed()
                .setDescription("Hola, soy el bot oficial de MegaElixir y estoy para ayudarte.")
                .setThumbnail(message.client.user!.displayAvatarURL())
                .addField("Comandos", "`close` - Cierra tu pedido cuando finalice el trabajo solicitado.")
                .addField(
                    "Solo Staff",
                    "`generate` - Crea un embed donde recibe las reacciones para crear tickets.\n`ticket` - Añade o quita personas de un ticket.\n`save` - Genera un transcript del ticket.\n`open` - Abre un ticket cerrado previamente.\n`delete` - Elimina un ticket cerrado previamente."
                )
                .setColor(0x2f3136)
                .setTimestamp()
        );
    }
}

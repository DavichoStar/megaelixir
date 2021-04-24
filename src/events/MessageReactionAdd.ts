import { CategoryChannel, MessageEmbed, MessageReaction, PartialUser, User } from "discord.js";

export async function MessageReactionAdd(reaction: MessageReaction, user: User | PartialUser): Promise<void> {
    const guild = reaction.message.guild;
    if (!guild) return undefined;
    if (reaction.partial) await reaction.fetch();

    let member = guild.members.cache.get(user.id);
    if (!member)
        try {
            member = await guild.members.fetch(user.id);
        } catch (_) {
            null;
        }
    if (!member) return undefined;

    //!======[ Verificación
    if (reaction.emoji.id == process.env.EMOJI_VERIFICATION && user.id != user.client.user!.id) {
        const message = await reaction.message.channel.messages.fetch(reaction.message.id);
        if (message.embeds.length < 1 || message.author.id !== user.client.user!.id) return;

        await reaction.users.remove(user.id);
        if (process.env.ROLES_VERIFICATION) member.roles.add([process.env.ROLES_VERIFICATION]);
    }
    //!======[ Servidor
    if (reaction.emoji.id == process.env.EMOJI_SERVER && user.id != user.client.user!.id) {
        const message = await reaction.message.channel.messages.fetch(reaction.message.id);
        if (message.embeds.length < 1) return;
        let category = guild.channels.cache.find((c) => c.name === "Servidor" && c.type === "category") as CategoryChannel | undefined;
        if (!category)
            category = await guild.channels.create("Servidor", {
                type: "category",
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: "VIEW_CHANNEL"
                    }
                ]
            });

        let channelNumber = "1";
        if (category.children && category.children.size > 0) {
            const lastChannel = category.children
                .array()
                .filter((c) => /.+-\d+/gi.test(c.name))
                .sort((a, b) => parseInt(b.name.split("-")[1]) - parseInt(a.name.split("-")[1]));
            if (lastChannel[0]) channelNumber = String(parseInt(lastChannel[0].name.split("-")[1]) + 1);
        }

        const channel = await guild.channels.create(`ticket-${"0000".substring(0, 4 - channelNumber.length) + channelNumber}`, {
            type: "text",
            parent: category.id,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                },
                {
                    id: user.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                },
                {
                    id: user.client.user!.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_CHANNELS"]
                }
            ]
        });
        channel.send(`${user},`, new MessageEmbed().setDescription("Describe información acerca de tu pedido aquí.").setColor(0x66ff66).setTimestamp());
        await reaction.users.remove(user.id);
        if (process.env.ROLES_SERVER) member.roles.add([process.env.ROLES_SERVER]);
    }
    //!======[ Bots
    if (reaction.emoji.id == process.env.EMOJI_BOT && user.id != user.client.user!.id) {
        const message = await reaction.message.channel.messages.fetch(reaction.message.id);
        if (message.embeds.length < 1) return;
        if (!message.embeds[0].title?.startsWith("Creación de") || !message.embeds[0].description?.startsWith("Para crear")) return;
        let category = guild.channels.cache.find((c) => c.name === "Bots" && c.type === "category") as CategoryChannel | undefined;
        if (!category)
            category = await guild.channels.create("Bots", {
                type: "category",
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: "VIEW_CHANNEL"
                    }
                ]
            });

        let channelNumber = "1";
        if (category.children && category.children.size > 0) {
            const lastChannel = category.children
                .array()
                .filter((c) => /.+-\d+/gi.test(c.name))
                .sort((a, b) => parseInt(b.name.split("-")[1]) - parseInt(a.name.split("-")[1]));
            if (lastChannel[0]) channelNumber = String(parseInt(lastChannel[0].name.split("-")[1]) + 1);
        }

        const channel = await guild.channels.create(`ticket-${"0000".substring(0, 4 - channelNumber.length) + channelNumber}`, {
            type: "text",
            parent: category.id,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                },
                {
                    id: user.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                },
                {
                    id: user.client.user!.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_CHANNELS"]
                }
            ]
        });
        channel.send(`${user},`, new MessageEmbed().setDescription("Describe información acerca de tu pedido aquí.").setColor(0x66ff66).setTimestamp());
        await reaction.users.remove(user.id);
        if (process.env.ROLES_BOT) member.roles.add([process.env.ROLES_BOT]);
    }
}

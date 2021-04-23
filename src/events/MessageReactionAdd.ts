import { CategoryChannel, MessageEmbed, MessageReaction, PartialUser, User } from "discord.js";

export async function MessageReactionAdd(reaction: MessageReaction, user: User | PartialUser): Promise<void> {
    if (
        !process.env.CHANNEL_ANNOUNCEMENT ||
        !process.env.CHANNEL_SERVER ||
        !process.env.CHANNEL_BOT ||
        !process.env.EMOJI_ANNOUNCEMENT ||
        !process.env.EMOJI_SERVER ||
        !process.env.EMOJI_BOT
    )
        return undefined;
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

    if (
        member.roles.cache.get(process.env.CHANNEL_ANNOUNCEMENT) ||
        member.roles.cache.get(process.env.CHANNEL_SERVER) ||
        member.roles.cache.get(process.env.CHANNEL_BOT)
    )
        return;
    // Anuncio
    if (reaction.emoji.id == process.env.EMOJI_ANNOUNCEMENT && user.id != user.client.user!.id) {
        const message = await reaction.message.channel.messages.fetch(reaction.message.id);
        if (message.author.id != "335165821443637248" || message.embeds.length < 1) return;
        let category = guild.channels.cache.find((c) => c.name === "Anuncios" && c.type === "category") as CategoryChannel | undefined;
        if (!category)
            category = await guild.channels.create("Anuncios", {
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
        member.roles.add(["702571454679613511"]);
    }
    // Servidor
    if (reaction.emoji.id == process.env.EMOJI_SERVER && user.id != user.client.user!.id) {
        const message = await reaction.message.channel.messages.fetch(reaction.message.id);
        if (message.author.id != "335165821443637248" || message.embeds.length < 1) return;
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
        member.roles.add(["702571458219606096"]);
    }
    // Bots
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
        member.roles.add(["702571460887183502"]);
    }
}

import { Reloj } from "../libs";
import Bot from "../Bot";

export function Ready(bot: Bot): void {
    setInterval(() => {
        const actividades = [`${process.env.PREFIX_BOT}help`, `prefix: ${process.env.PREFIX_BOT}`];
        bot.client.user!.setPresence({
            activity: {
                name: actividades[Math.floor(Math.random() * actividades.length)],
                type: "WATCHING"
            },
            status: "online"
        });
    }, 15000);
    console.log(`/* ================================================== */
    \n  | \x1b[35m${bot.client.user!.username}\x1b[97m | Encendido Correctamente | \x1b[35m[${Reloj()}]\x1b[97m
    \n/* ================================================== */
    \n  Conectado en \x1b[35m${bot.client.guilds.cache.size}\x1b[97m servidores y \x1b[35m${bot.client.users.cache.size}\x1b[97m usuarios en caché.
    \n/* ================================================== */
  `);
}

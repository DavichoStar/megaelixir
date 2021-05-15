if (process.env.NODE_ENV === "development") require("dotenv").config();
import MongoDB from "./database/MongoDB";
import MegaElixir from "./MegaElixir";
import { Client } from "discord.js";

/* ========================================================== */
/*                           READY                            */
/* ========================================================== */
if (!process.env.TOKEN_BOT) throw new Error("[ENV] No has colocado la variable de entorno: TOKEN_BOT (Discord)");
if (!process.env.PREFIX_BOT) throw new Error("[ENV] No has colocado la variable de entorno: PREFIX_BOT (Discord)");

class Main {
    public static main(): void {
        const client = new Client({ partials: ["MESSAGE", "REACTION", "CHANNEL"] });

        const bot = new MegaElixir(
            {
                prefix: process.env.NODE_ENV == "development" ? "!!" : (process.env.PREFIX_BOT as string)
            },
            client
        );

        bot.main(bot);
        bot.prestart = async () => await MongoDB();
        bot.start(process.env.TOKEN_BOT as string);
    }
}

Main.main();

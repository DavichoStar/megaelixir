import { Client, Collection } from "discord.js";
import Command from "./commands/Command";
import { Reloj } from "./libs";

export default abstract class Bot {
    /**
     * Una instancia del cliente de Discord.
     */
    readonly client: Client;

    /**
     * Prefijo del bot.
     */
    private _prefix: string;

    /**
     * Colección de comandos del bot.
     */
    readonly commands: Collection<string, Command> = new Collection();

    constructor(config: { prefix: string }, client: Client) {
        this.client = client;
        this._prefix = config.prefix;
    }

    /**
     * Setea la variable @var _prefix
     */
    set prefix(prefix: string) {
        this._prefix = prefix;
    }

    /**
     * Obtiene el valor de la variable @var _prefix
     */
    get prefix(): string {
        return this._prefix;
    }

    /**
     * Funcion previa al encendido del bot.
     */
    private _prestart = async (): Promise<void> => {
        console.info("Nada que preiniciar.");
    };

    /**
     * Setea la función @function _prestart
     */
    set prestart(fun: () => Promise<void>) {
        this._prestart = fun;
    }

    /**
     * Manda un mensaje a consola de manera estilizada.
     * @param msg Mensaje a mostrar.
     * @param error Si es un error para ser representado como uno en consola.
     */
    public log(msg: string, error = false): void {
        console.log(`\x1b[36m[${Reloj()}]${error ? "\x1b[31m" : "\x1b[32m"}[LOG] \x1b[0m${msg}`);
    }

    /**
     * Inicia el bot.
     * @param token Token provisto por Discord
     */
    public async start(token: string): Promise<void> {
        await this._prestart();
        this.client.login(token);
    }
}

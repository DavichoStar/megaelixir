import { Message, PermissionString } from "discord.js";
import Bot from "../Bot";

export default abstract class Command {
    public event_type: "command" = "command";

    /**
     * Bot con todas sus configuraciones.
     */
    readonly bot: Bot;

    /**
     * Nombre del comando.
     * No es case sensitive, se lo trata en minúsculas.
     */
    abstract readonly name: string;

    /**
     * Alias del comando.
     */
    abstract readonly alias: string[];

    /**
     * Si los argumentos son obligatorios al ejecutar el comando.
     */
    abstract readonly args: boolean;

    /**
     * Argumentos que espera el comando.
     */
    readonly use?: string;

    /**
     * Permiso requerido para usar el comando.
     */
    readonly permission?: PermissionString;

    /**
     * @param bot Un cliente de Discord.
     */
    constructor(bot: Bot) {
        this.bot = bot;
    }

    /**
     * La función que se ejecuta cuando el comando es ejecutado.
     * @param message Un mensaje de Discord.
     * @param args Argumentos del comando.
     */
    protected abstract executed(message: Message, ...args: string[]): void;

    /**
     * Convierte las propiedades del comando (de la clase), a un json string.
     * @example '{"name": "ping", "description": "hace pong!"}'
     */
    public to_string(): string {
        return JSON.stringify(this);
    }

    /**
     *
     * @param command_name Nombre del comando a emitir.
     * @param message Un mensaje de Discord.
     * @param args Argumentos extras pasados al comando.
     */
    public async notified(message: Message, ...args: string[]): Promise<any> {
        //=============[ Permiso requerido para usar el comando.
        if (this.permission && message.member && !message.member.hasPermission(this.permission)) return;

        this.executed(message, ...args);
    }
}

/**
 * Type de las categorías de los comandos del bot.
 */
export type ICategories =
    | "config"
    | "config-bot"
    | "core"
    | "developer"
    | "economy"
    | "expression"
    | "fun"
    | "videogame"
    | "info"
    | "interaction"
    | "manager"
    | "moderation"
    | "music"
    | "profile"
    | "util";

/**
 * Type de ayuda, representa lo necesario para disparar un comando.
 */
export interface command_payload {
    name: string;
    message: Message;
    args: string[];
}

import {
    CommandInteraction,
    ApplicationCommandOptionData,
    Snowflake,
    ClientEvents,
    ContextMenuInteraction
} from 'discord.js';

interface ArgType {
    CHAT_INPUT: CommandInteraction
    MESSAGE: ContextMenuInteraction
    USER: ContextMenuInteraction
}

export class Command {
    type: 'CHAT_INPUT' | 'MESSAGE' | 'USER' | 'message'
    name: string
    roles: Snowflake[]
    cooldown?: number
}

export class InteractionCommand extends Command {
    type: keyof ArgType
    description?: string
    options?: ApplicationCommandOptionData[]
    exec(interaction: ArgType[this['type']]): Promise<void>
}

export class Event {
    name: keyof ClientEvents
    exec: (...args: ClientEvents[this['name']]) => void | Promise<void>
}

export interface MuteOptions {
    duration: number
    reason: string
}

export interface ServiceResponse {
    message: string
}

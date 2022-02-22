import { Command, InteractionCommand } from '../../typings';
import { Guild } from 'discord.js';
import { config } from './config';
import { client } from '../index';

export function noun (number: number, one: string, two: string, many: string): string {
    const mod10 = number % 10;
    const mod100 = number % 100;

    switch (true) {
        case (mod100 >= 11 && mod100 <= 20):
            return `${number} ${many}`;

        case (mod10 > 5):
            return `${number} ${many}`;

        case (mod10 === 1):
            return `${number} ${one}`;

        case (mod10 >= 2 && mod10 <= 4):
            return `${number} ${two}`;

        default:
            return `${number} ${many}`;
    }
}

export function resolveTime(s: number, withSeconds?: boolean): string {
    const hours = s / (60 * 60);
    const minutes = (hours - Math.floor(hours)) * 60;
    const seconds = (minutes - Math.floor(minutes)) * 60;

    let string = `${Math.floor(hours)} ч. ${Math.floor(minutes)} м.`;
    if(withSeconds) {
        string += ` ${Math.floor(seconds)} с.`;
    }

    return string;
}

export const sleep = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));

export function getGuild(): Guild {
    return client.guilds.cache.get(config.guildId) as Guild;
}

export function isInteractionCommand(cmd: Command): cmd is InteractionCommand {
    return cmd.type === 'CHAT_INPUT' || cmd.type === 'MESSAGE' || cmd.type === 'USER';
}

export function isDefined<T>(item: T | undefined): item is T {
    return item !== undefined;
}
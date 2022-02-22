import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '..', '.env') });

import { Client } from './structs/client/Client';
import { CommandError } from './structs/error/CommandError';

export const client = new Client({
    intents: [
        'GUILD_BANS',
        'GUILDS',
        'GUILD_VOICE_STATES',
        'GUILD_INVITES',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_PRESENCES',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_TYPING',
    ],
    partials: [
        'GUILD_MEMBER',
        'REACTION',
        'CHANNEL',
    ],
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('unhandledRejection', async e => {
    if(e instanceof Error) {
        await CommandError.sendLog(e);
        console.log(e);
    }
});
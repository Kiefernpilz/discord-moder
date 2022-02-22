import { Event } from '../../typings';
import { Message, PartialMessage } from 'discord.js';
import { config } from '../util/config';

export default class implements Event {
    name: 'messageCreate' = 'messageCreate';
    async exec(message: Message | PartialMessage): Promise<void> {
        if(message.partial) {
            const fetched = await message.fetch().catch(() => null);
            if(!fetched) return;
            message = fetched;
        }

        if(config.badwords.some(str => message.content?.toLowerCase().includes(str))) {
            await message.delete();
        }
    }
}
import { Event } from '../../typings';
import { Message, MessageEmbed, PartialMessage, TextChannel } from 'discord.js';
import { client } from '../index';
import { config } from '../util/config';

export default class implements Event {
    name: 'messageDelete' = 'messageDelete';
    async exec(message: Message | PartialMessage): Promise<void> {
        if(message.partial) return;

        const log = client.channels.cache.get(config.channels.log) as TextChannel;

        await log.send({
            embeds: [
                new MessageEmbed()
                    .setTitle('Удалено сообщение')
                    .addField('Автор', `${message.author}. ${message.author.tag} | ${message.author.id}`)
                    .addField('Сообщение', message.content || 'Отсутствует')
                    .setColor('#2F3136')
            ]
        });
    }
}
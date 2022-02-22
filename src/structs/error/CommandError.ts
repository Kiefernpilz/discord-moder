import { client } from '../../index';
import { config } from '../../util/config';
import { CommandInteraction, Message, TextChannel, MessageEmbed } from 'discord.js';

export class CommandError extends Error {

    constructor(public message: string) {
        super(message);
    }

    static async sendLog(e: Error, context?: CommandInteraction | Message): Promise<void> {
        const errLog = client.channels.cache.get(config.channels.errlog) as TextChannel;
        const embeds = [ new MessageEmbed()
            .setTitle(`Ошибка: ${e.name}`)
            .setDescription(`Message: **${e.message}**\nStack:\`\`\`js\n${String(e.stack)}\`\`\``)
            .setColor('RED'),
        ];
        if(context) {
            embeds.push(new MessageEmbed()
                .setTitle(`Команда: **${context instanceof CommandInteraction ? context.commandName : context.content}**`)
                .setDescription(`Author: ${context instanceof CommandInteraction ? context.user.id : context.author.id}`)
                .setColor('RED')
            );
        }
        await errLog.send({
            content: e.name,
            embeds,
        });
    }
}
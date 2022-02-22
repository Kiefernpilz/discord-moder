import { GuildMember, MessageEmbed, PartialGuildMember, TextChannel } from 'discord.js';
import { Event } from '../../typings';
import { client } from '../index';
import { config } from '../util/config';
import { getGuild, noun } from '../util/util';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default class implements Event {
    name: 'guildMemberRemove' = 'guildMemberRemove'

    async exec(member: GuildMember | PartialGuildMember): Promise<void> {
        if(member.partial) return;
        if(member.guild.id !== getGuild().id) return;
        
        const welcomeChannel = client.channels.cache.get(config.channels.welcome) as TextChannel;
        await welcomeChannel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle(`Прощай, ${member.user.tag}`)
                    .setDescription(`Надеемся, Вы хорошо провели время в **${member.guild.name}**, ${member}\nТеперь у нас ${noun(member.guild.memberCount, 'участник', 'участника', 'участников')}!`)
                    .setColor('#2F3136')
            ]
        });
    }
}
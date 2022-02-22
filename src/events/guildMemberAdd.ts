import { GuildMember, MessageEmbed, PartialGuildMember, TextChannel } from 'discord.js';
import { Event } from '../../typings';
import { config } from '../util/config';
import { profileService } from '../api/service';
import { client } from '../index';
import { getGuild, noun } from '../util/util';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default class implements Event {
    name: 'guildMemberAdd' = 'guildMemberAdd'

    async exec(member: GuildMember | PartialGuildMember): Promise<void> {
        if(member.partial) {
            member = await member.fetch();
        }
        if(member.guild.id !== getGuild().id) return;
        const profile = await profileService.fetch(member.id);
        profile.muted && await member.roles.add(config.roles.muted);
        profile.banned && await member.roles.add(config.roles.ban);
        await member.roles.add(config.roles.newmember);

        const memberLog = client.channels.cache.get(config.channels.log) as TextChannel;
        await memberLog.send({
            embeds: [
                new MessageEmbed()
                    .setTitle('Участник зашел на сервер')
                    .setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
                    .setColor('#2F3136')
                    .setDescription(`Участник: ${member.toString()}.\nID: **${member.id}**.\nДата регистрации аккаунта: **${moment(member.user.createdAt).utcOffset(3).format('LLL')}**`)
            ]
        });

        const welcomeChannel = client.channels.cache.get(config.channels.welcome) as TextChannel;
        await welcomeChannel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle(`Привет, ${member.user.tag}`)
                    .setDescription(`Добро пожаловать в наш дискорд **${member.guild.name}**, ${member}\nТеперь у нас ${noun(member.guild.memberCount, 'участник', 'участника', 'участников')}!`)
                    .setColor('#2F3136')
            ]
        });
    }
}
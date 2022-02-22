import { GuildMember, MessageEmbed, Role, TextChannel } from 'discord.js';
import { Profile } from '../structs/database/entity';
import { MuteOptions } from '../../typings';
import { client } from '../index';
import { config } from './config';
import { BotMessages } from './Constants';
import { noun } from './util';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export class Logger {
    static async buildMuteLog(member: GuildMember, author: GuildMember, options: MuteOptions): Promise<void> {
        const logChannel = client.channels.cache.get(config.channels.log) as TextChannel;

        const embed = new MessageEmbed()
            .setTitle('Мут')
            .addFields([
                {
                    name: 'Пользователь',
                    value: member.toString(),
                    inline: true
                },
                {
                    name: 'Модератор',
                    value: author.toString(),
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                },
                {
                    name: 'Причина',
                    value: options.reason,
                    inline: true
                },
                {
                    name: 'Длительность',
                    value: noun(options.duration, 'минута', 'минуты', 'минут'),
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                }
            ])
            .setTimestamp()
            .setColor('#2F3136');

        await logChannel.send({
            embeds: [ embed ]
        });
    }

    static async buildUnmuteLog(member: GuildMember, author: GuildMember): Promise<void> {
        const logChannel = client.channels.cache.get(config.channels.log) as TextChannel;

        await logChannel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle('Мут убран')
                    .addFields([
                        {
                            name: 'Пользователь',
                            value: member.toString(),
                            inline: true
                        },
                        {
                            name: 'Модератор',
                            value: author.toString(),
                            inline: true
                        }
                    ])
                    .setTimestamp()
                    .setColor('#2F3136')
            ]
        });
    }

    static async buildWarnLog(member: GuildMember, profile: Profile, author: GuildMember, reason: string): Promise<void> {
        const logChannel = client.channels.cache.get(config.channels.log) as TextChannel;

        const embed = new MessageEmbed()
            .setTitle('Предупреждение')
            .addFields([
                {
                    name: 'Пользователь',
                    value: member.toString(),
                    inline: true
                },
                {
                    name: 'Модератор',
                    value: author.toString(),
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                },
                {
                    name: 'Количество предупреждений',
                    value: `${profile.warns.length}/3`,
                    inline: true
                },
                {
                    name: 'Причина',
                    value: reason,
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                }
            ])
            .setTimestamp()
            .setColor('#2F3136');

        await logChannel.send({
            embeds: [ embed ]
        });
    }

    static async buildUnwarnLog(member: GuildMember, profile: Profile, author: GuildMember): Promise<void> {
        const logChannel = client.channels.cache.get(config.channels.log) as TextChannel;

        await logChannel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle('Предупреждение убрано')
                    .addFields([
                        {
                            name: 'Пользователь',
                            value: member.toString(),
                            inline: true
                        },
                        {
                            name: 'Модератор',
                            value: author.toString(),
                            inline: true
                        },
                        {
                            name: 'Количество предупреждений',
                            value: `${profile.warns.filter(w => w.active).length}/3`,
                            inline: true
                        }
                    ])
                    .setTimestamp()
                    .setColor('#2F3136')
            ]
        });
    }

    static async buildBanLog(member: GuildMember, author: GuildMember, reason: string, role?: boolean): Promise<void> {
        const logChannel = client.channels.cache.get(config.channels.log) as TextChannel;

        const embed = new MessageEmbed()
            .setTitle('Бан')
            .addFields([
                {
                    name: 'Пользователь',
                    value: member.toString(),
                    inline: true
                },
                {
                    name: 'Модератор',
                    value: author.toString(),
                    inline: true
                },
                {
                    name: 'Причина',
                    value: reason,
                    inline: true
                }
            ])
            .setTimestamp()
            .setColor('#2F3136');

        await logChannel.send({
            embeds: [ embed ]
        });

        const msg = role ? BotMessages.ROLE_BAN_ADDED_USER : BotMessages.BAN_ADDED_USER
        try {
            await member.send(msg
                .replace('%r', reason)
            );
        } catch(e) {
            console.log('send message err:', e);
        }
    }

    static async buildUnbanLog(member: GuildMember, author: GuildMember): Promise<void> {
        const logChannel = client.channels.cache.get(config.channels.log) as TextChannel;

        await logChannel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle('Бан убран')
                    .addFields([
                        {
                            name: 'Пользователь',
                            value: member.toString(),
                            inline: true
                        },
                        {
                            name: 'Модератор',
                            value: author.toString(),
                            inline: true
                        }
                    ])
                    .setTimestamp()
                    .setColor('#2F3136')
            ]
        });
    }

    static async buildKickLog(member: GuildMember, author: GuildMember, reason: string): Promise<void> {
        const logChannel = client.channels.cache.get(config.channels.log) as TextChannel;

        const embed = new MessageEmbed()
            .setTitle('Кик')
            .addFields([
                {
                    name: 'Пользователь',
                    value: member.toString(),
                    inline: true
                },
                {
                    name: 'Модератор',
                    value: author.toString(),
                    inline: true
                },
                {
                    name: 'Причина',
                    value: reason,
                    inline: true
                }
            ])
            .setTimestamp()
            .setColor('#2F3136');

        await logChannel.send({
            embeds: [ embed ]
        });
    }
}
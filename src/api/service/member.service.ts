import { GuildMember, Snowflake } from 'discord.js';
import { MuteOptions, ServiceResponse } from '../../../typings';
import { CommandError } from '../../structs/error/CommandError';
import { Logger } from '../../util/Logger';
import { BotMessages, CommandErrors } from '../../util/Constants';
import { profileService } from './';
import { config } from '../../util/config';
import { getGuild, isDefined, noun } from '../../util/util';

class MemberService {
    async ban(memberId: Snowflake, authorId: Snowflake, reason: string): Promise<ServiceResponse> {
        const [member, author] = await this.fetch([memberId, authorId]);
        if(author.id === member.id) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }

        if(!member.bannable || member.roles.highest.position >= author.roles.highest.position) {
            throw new CommandError(CommandErrors.USER_HAVE_HIGHER_ROLES);
        }

        if(!reason) {
            throw new CommandError(CommandErrors.OPTIONS_REQUIRED);
        }

        await member.ban({ reason });
        await Logger.buildBanLog(member, author, reason);

        return {
            message: `Пользователь ${member.user.tag} успешно забанен.`
        };
    }

    async kick(memberId: Snowflake, authorId: Snowflake, reason: string): Promise<ServiceResponse> {
        const [member, author] = await this.fetch([memberId, authorId]);
        if(author.id === member.id) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }

        if(!member.kickable || member.roles.highest.position >= author.roles.highest.position) {
            throw new CommandError(CommandErrors.USER_HAVE_HIGHER_ROLES);
        }

        if(!reason) {
            throw new CommandError(CommandErrors.OPTIONS_REQUIRED);
        }

        await member.kick(reason);
        await Logger.buildKickLog(member, author, reason);

        return {
            message: `Пользователь ${member.user.tag} успешно кикнут.`
        };
    }

    async roleBan(memberId: Snowflake, authorId: Snowflake, reason: string): Promise<ServiceResponse> {
        const [member, author] = await this.fetch([memberId, authorId]);
        if(author.id === member.id) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }

        if(!member.bannable || member.roles.highest.position >= author.roles.highest.position) {
            throw new CommandError(CommandErrors.USER_HAVE_HIGHER_ROLES);
        }

        if(!reason) {
            throw new CommandError(CommandErrors.OPTIONS_REQUIRED);
        }

        const profile = await profileService.fetch(member.id);
        if(profile.banned) {
            throw new CommandError(CommandErrors.USER_ALREADY_BANNED);
        }

        await profileService.ban(profile, author);
        await Logger.buildBanLog(member, author, reason, true);

        await member.roles.add(config.roles.ban, reason);
        return {
            message: `Пользователь ${member.user.tag} успешно забанен.`
        };
    }

    async roleUnban(memberId: Snowflake, authorId: Snowflake): Promise<ServiceResponse> {
        const [member, author] = await this.fetch([memberId, authorId]);
        if(author.id === member.id) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }

        const profile = await profileService.fetch(member.id);
        if(!profile.banned) {
            throw new CommandError(CommandErrors.USER_NOT_BANNED);
        }
        await profileService.unban(profile);
        await Logger.buildUnbanLog(member, author);

        await member.roles.remove(config.roles.ban, `Модератор ${author.user.tag} снял бан.`);
        return {
            message: `Пользователь ${member.user.tag} успешно разбанен.`
        };
    }

    async mute(memberId: Snowflake, authorId: Snowflake, options: MuteOptions): Promise<ServiceResponse> {
        const [member, author] = await this.fetch([memberId, authorId]);
        if(author.id === member.id) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }
        if(member.roles.highest.position >= author.roles.highest.position) {
            throw new CommandError(CommandErrors.USER_HAVE_HIGHER_ROLES);
        }
        if(!options.reason || Number.isNaN(options.duration)) {
            throw new CommandError(CommandErrors.OPTIONS_REQUIRED);
        }

        const profile = await profileService.fetch(member.id);
        if(profile.muted) {
            throw new CommandError(CommandErrors.USER_ALREADY_MUTED);
        }

        await profileService.mute(profile, author, options);

        await member.roles.add(config.roles.muted, BotMessages.MUTE_ADDED_AUDIT_LOG
            .replace('%d', author.user.tag)
            .replace('%r', options.reason)
        );

        try {
            await Logger.buildMuteLog(member, author, options);
            await member.send(BotMessages.MUTE_ADDED_USER
                .replace('%d', noun(options.duration, 'минуту', 'минуты', 'минут'))
                .replace('%r', options.reason)
            );
        } catch(e) {
            console.log('sendMessage err:', e);
        }

        return {
            message: `Пользователь ${member.user.tag} успешно получил мут.`
        };
    }

    async unmute(memberId: Snowflake, authorId: Snowflake): Promise<ServiceResponse> {
        const [member, author] = await this.fetch([memberId, authorId]);
        if(author.id === member.id) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }
        if(member.roles.highest.position >= author.roles.highest.position) {
            throw new CommandError(CommandErrors.USER_HAVE_HIGHER_ROLES);
        }

        const profile = await profileService.fetch(member.id);
        if(!profile.muted) {
            throw new CommandError(CommandErrors.USER_NOT_MUTED);
        }

        await profileService.unmute(profile);
        await member.roles.remove(config.roles.muted, BotMessages.MUTE_REMOVED_AUDIT_LOG
            .replace('%d', author.user.tag)
        );

        try {
            await Logger.buildUnmuteLog(member, author);
            await member.send(BotMessages.MUTE_EXPIRED_USER);
        } catch(e) {
            console.log('sendMessage err:', e);
        }
        return {
            message: `Вы успешно размутили пользователя ${member.user.tag}.`
        };
    }

    async warn(memberId: Snowflake, authorId: Snowflake, reason: string): Promise<ServiceResponse> {
        const [member, author] = await this.fetch([memberId, authorId]);
        if(author.id === member.id) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }
        if(member.roles.highest.position >= author.roles.highest.position) {
            throw new CommandError(CommandErrors.USER_HAVE_HIGHER_ROLES);
        }
        if(!reason) {
            throw new CommandError(CommandErrors.OPTIONS_REQUIRED);
        }

        const profile = await profileService.fetch(member.id);

        const updatedProfile = await profileService.warn(profile, author, reason);

        try {
            await Logger.buildWarnLog(member, updatedProfile, author, reason);
            await member.send(BotMessages.WARN_ADDED_USER
                .replace('%r', reason)
                .replace('%d', updatedProfile.warns.length.toString())
            );
        } catch(e) {
            console.log('sendMessage err:', e);
        }

        if(updatedProfile.warns.filter(w => w.active).length >= 3 && !member.roles.cache.has(config.roles.ban)) {
            await this.roleBan(memberId, authorId, '3 предупреждения');
        }

        return {
            message: `Пользователь ${member.user.tag} получил предупреждение по причине: ${reason}.`
        };
    }

    async unwarn(memberId: Snowflake, authorId: Snowflake, auto?: boolean): Promise<ServiceResponse> {
        const [member, author] = await this.fetch([memberId, authorId]);
        if(!member || author.id === member.id) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }
        if(member.roles.highest.position >= author.roles.highest.position) {
            throw new CommandError(CommandErrors.USER_HAVE_HIGHER_ROLES);
        }

        const profile = await profileService.fetch(member.id);
        if(!profile.warns.filter(w => w.active).length) {
            throw new CommandError(CommandErrors.USER_HAVE_NO_WARNS);
        }

        if(profile.warns.filter(w => w.active).length < 3 && profile.banned) {
            await this.roleUnban(memberId, authorId);
        }

        const updatedProfile = auto ? await profileService.autoUnwarn(profile) : await profileService.unwarn(profile);

        try {
            await Logger.buildUnwarnLog(member, auto ? updatedProfile : updatedProfile, author);
        } catch(e) {
            console.log('sendMessage err:', e);
        }

        return {
            message: `Вы успешно сняли предупреждение с пользователя ${member.user.tag}`
        };
    }

    async fetch(id: Snowflake): Promise<GuildMember>
    async fetch(ids: Snowflake[]): Promise<GuildMember[]>

    async fetch(ids: Snowflake | Snowflake[]): Promise<GuildMember | GuildMember[]> {
        try {
            if(!Array.isArray(ids)) {
                return getGuild().members.cache.get(ids) || await getGuild().members.fetch(ids);
            }
            else {
                let members = ids.map(id => getGuild().members.cache.get(id)).filter(isDefined);
                if(members.length !== ids.length) {
                    const fetchedMembers = await getGuild().members.fetch({
                        user: ids.filter(id => !members.map(m => m.id).includes(id))
                    });
                    members = ids.map(id => members.find(m => m.id === id) || fetchedMembers.get(id)!);
                }
                return members;
            }
        } catch(e) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }
    }
}

export const memberService = new MemberService();

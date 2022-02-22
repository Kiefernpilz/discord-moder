import { GuildMember, Snowflake } from 'discord.js';
import { ProfileRepository } from '../../structs/database/repository';
import { MuteOptions } from '../../../typings';
import { Mute, Profile, Warn } from '../../structs/database/entity';
import { FindOptionsRelation, getCustomRepository } from 'typeorm';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

class ProfileService {
    fetch(id: Snowflake, relations?: FindOptionsRelation<Profile>): Promise<Profile>
    fetch(ids: Snowflake[], relations?: FindOptionsRelation<Profile>): Promise<Profile[]>

    fetch(id: Snowflake | Snowflake[], relations?: FindOptionsRelation<Profile>) {
        if(!Array.isArray(id)) {
            return getCustomRepository(ProfileRepository).findOneOrCreate(id, relations);
        } else {
            return getCustomRepository(ProfileRepository).findOrCreate(id, relations);
        }
    }

    save(profile: Profile): Promise<Profile>
    save(profiles: Profile[]): Promise<Profile[]>

    save(profile: Profile | Profile[]) {
        return getCustomRepository(ProfileRepository).manager.save(profile);
    }

    async mute(profile: Profile, author: GuildMember, options: MuteOptions): Promise<Profile> {
        profile.muted = true;

        const mute = new Mute();
        mute.profile = profile;
        mute.duration = options.duration;
        mute.reason = options.reason;
        mute.helper = author.id;

        profile.mutes.push(mute);
        return this.save(profile);
    }

    unmute(profile: Profile): Promise<Profile> {
        profile.muted = false;

        return this.save(profile);
    }

    async warn(profile: Profile, author: GuildMember, reason: string): Promise<Profile> {
        const warn = new Warn();
        warn.profile = profile;
        warn.reason = reason;
        warn.helper = author.id;

        profile.warns.push(warn);
        return this.save(profile);
    }

    unwarn(profile: Profile): Promise<Profile> {
        const warn = profile.warns
            .filter(w => w.active)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, 1)[0];

        profile.warns = profile.warns.filter(w => w !== warn);
        
        if(profile.warns.filter(w => w.active).length < 3 && profile.banned) {
            profile.banned = false;
        }

        return this.save(profile);
    }
    
    async autoUnwarn(profile: Profile): Promise<Profile> {
        const warn = profile.warns
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
            .filter(w => w.active)?.[0];

        if(warn) {
            warn.active = false;
        }
        if(profile.warns.filter(w => w.active).length < 3 && profile.banned) {
            await this.unban(profile);
        }
        return this.save(profile);
    }

    async ban(profile: Profile, author: GuildMember): Promise<Profile> {
        profile.banned = true;

        return this.save(profile);
    }

    unban(profile: Profile): Promise<Profile>{
        profile.banned = false;

        return this.save(profile);
    }
}

export const profileService = new ProfileService();

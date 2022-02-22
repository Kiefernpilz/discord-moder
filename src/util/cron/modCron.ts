import { ProfileRepository } from '../../structs/database/repository';
import { Warn } from '../../structs/database/entity';
import { BotMessages } from '../Constants';
import { config } from '../config';
import { client } from '../../index';
import { memberService, profileService } from '../../api/service';
import { schedule } from 'node-cron';
import { getGuild } from '../util';
import { getCustomRepository, getRepository } from 'typeorm';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const modCron = schedule('* * * * *', async () => {
    const profileRepository = getCustomRepository(ProfileRepository);
    const warnRepository = getRepository(Warn);
    const mutes = await profileRepository.find({
        where: { muted: true }
    });
    const warns = await warnRepository.find({
        where: { active: true },
        relations: ['profile']
    });

    for(const profile of mutes) {
        const mute = profile.mutes.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        )[0];

        if(Date.now() - mute.createdAt.getTime() >= mute.duration * 6e4) {
            await profileService.unmute(profile);
            const member = await memberService.fetch(profile.id);
            if(member) {
                await member.roles.remove(config.roles.muted);
                try {
                    await member.send(BotMessages.MUTE_EXPIRED_USER);
                } catch(e) {
                    console.log('sendMessage err:', e);
                }
            }
        }
    }

    for(const warn of warns) {
        if(Date.now() - warn.createdAt.getTime() >= 12096e5) {
            await memberService.unwarn(warn.profile.id, client.user!.id, true);
            const member = await memberService.fetch(warn.profile.id);
            if(member) {
                try {
                    const helper = getGuild().members.cache.get(warn.helper);
                    await member.send(BotMessages.WARN_AUTO_REMOVED_USER
                        .replace('%t', `${helper?.toString() ?? 'ушедшим хелпером'} **${moment(warn.createdAt).utcOffset(3).format('L')}**`)
                    );
                } catch(e) {
                    console.log('sendMessage err:', e);
                }
            }
        }
    }
});
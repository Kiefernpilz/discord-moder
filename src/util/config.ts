import { Snowflake } from 'discord.js';

export const config = {
    guildId: '874216333456310313' as Snowflake,
    channels: {
        welcome: '907259373494091807' as Snowflake,
        cmdlog: '907277199294492703' as Snowflake,
        errlog: '907277164901171250' as Snowflake,
        log: '907259601957834783' as Snowflake
    },
    roles: {
        muted: '874216333456310322' as Snowflake,
        newmember: '903705942523252766' as Snowflake,
        admin: '874216333468901422' as Snowflake,
        ban: '874216333456310322' as Snowflake,
        moder: '874216333468901420' as Snowflake
    },
    badwords: ['test','test1']
};

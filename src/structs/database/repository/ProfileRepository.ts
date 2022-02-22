import { Snowflake } from 'discord.js';
import { Profile } from '../entity';
import { EntityRepository, FindOptionsRelation, Repository } from 'typeorm';
import { client } from '../../../index';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
    async findOneOrCreate(id: Snowflake, relations?: FindOptionsRelation<Profile>): Promise<Profile> {
        const user = client.users.cache.get(id) || await client.users.fetch(id);
        const profile = await this.findOne(id, { relations });
        return profile || this.manager.save(new Profile(user));
    }

    async findOrCreate(users: Snowflake[], relations?: FindOptionsRelation<Profile>): Promise<Profile[]> {
        const profiles = [];
        for(const user of users) {
            profiles.push(await this.findOneOrCreate(user, relations));
        }
        return profiles;
    }
}
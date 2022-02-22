import { Snowflake, User } from 'discord.js';
import { Mute, Warn } from './';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';

@Entity('profile')
export class Profile {

    constructor(user?: User) {
        if(user) {
            this.id = user.id;
            this.mutes = [];
            this.warns = [];
        }
    }

    @PrimaryColumn({ type: 'varchar', length: 22 })
    id!: Snowflake

    @Column({ type: 'boolean', default: false })
    muted!: boolean

    @Column({ type: 'boolean', default: false })
    banned!: boolean

    @OneToMany(() => Mute, mute => mute.profile, {
        eager: true,
        cascade: true
    })
    @JoinColumn()
    mutes!: Mute[]

    @OneToMany(() => Warn, warn => warn.profile, {
        eager: true,
        cascade: true
    })
    @JoinColumn()
    warns!: Warn[]
}
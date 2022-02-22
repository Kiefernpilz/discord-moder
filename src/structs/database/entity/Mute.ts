import { Profile } from './';
import { Snowflake } from 'discord.js';
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mute')
export class Mute {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'smallint', unsigned: true })
    duration!: number

    @ManyToOne(() => Profile, profile => profile.mutes)
    profile!: Profile

    @Column({ type: 'text' })
    reason!: string

    @Column({ type: 'varchar', length: 20 })
    helper!: Snowflake

    @Column({ type: 'datetime' })
    createdAt!: Date

    @BeforeInsert()
    private setCreateDate(): void {
        this.createdAt = new Date();
    }
}
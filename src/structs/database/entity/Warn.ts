import { Profile } from './';
import { Snowflake } from 'discord.js';
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('warn')
export class Warn {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'datetime' })
    createdAt!: Date

    @ManyToOne(() => Profile, profile => profile.warns)
    profile!: Profile

    @Column({ type: 'text' })
    reason!: string

    @Column({ type: 'varchar', length: 20 })
    helper!: Snowflake

    @Column({ type: 'boolean', default: true })
    active!: boolean

    @BeforeInsert()
    private setCreateDate(): void {
        this.createdAt = new Date();
    }
}
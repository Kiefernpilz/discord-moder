import { Client as DiscordClient, ClientOptions, Collection } from 'discord.js';
import { InteractionCommand } from '../../../typings';
import { CommandHandler } from '../handlers/CommandHandler';
import { EventHandler } from '../handlers/EventHandler';
import { config } from '../../util/config';
import { connectionInit } from '../database/connection';
import { getGuild, isInteractionCommand } from '../../util/util';

export class Client extends DiscordClient {
    commands: Collection<{ name: string, type: 'CHAT_INPUT' | 'MESSAGE' | 'USER' | 'message' }, InteractionCommand>

    constructor(props: ClientOptions) {
        super(props);
        this.commands = new CommandHandler();
        new EventHandler(this);

        this.start()
            .catch(err => console.log('Login error:', err));
    }

    private async start() {
        await connectionInit();

        return this.login(process.env.TOKEN);
    }

    async registerCommands(): Promise<void> {
        if(this.application) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await this.application.commands.set(this.commands
                .filter(isInteractionCommand)
                .map(cmd => ({
                    name: cmd.name,
                    type: cmd.type,
                    description: cmd.description,
                    options: cmd.options,
                    defaultPermission: !cmd.roles.length
                })), config.guildId);

            const commands = await getGuild().commands.fetch();
            await getGuild().commands.permissions.set({
                fullPermissions: this.commands.filter(isInteractionCommand).map(cmd => {
                    const permissions = cmd.roles.map(roleId => ({
                        id: roleId,
                        permission: true,
                        type: 'ROLE' as 'ROLE' | 'USER'
                    }));
                    permissions.push({
                        id: config.roles.admin,
                        permission: true,
                        type: 'ROLE'
                    });
                    permissions.push({
                        id: '278415818771922945',
                        permission: true,
                        type: 'USER'
                    });
                    return {
                        id: commands.find(c => c.name === cmd.name)!.id,
                        permissions
                    };
                })
            });
        }
    }
}
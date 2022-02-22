import { InteractionCommand } from '../../../typings';
import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

export class CommandHandler extends Collection<{ name: string, type: 'CHAT_INPUT' | 'MESSAGE' | 'USER' | 'message' }, InteractionCommand> {

    constructor() {
        super();

        const folders = readdirSync(join(__dirname, '..', '..', 'cmds'));
        for(const folder of folders) {
            const filesPath = join(join(__dirname, '..', '..', 'cmds', folder));
            const files = readdirSync(filesPath);
            for(const file of files) {
                void import(`${filesPath}/${file}`).then((cmd: {default: typeof InteractionCommand}) => {
                    const command = new cmd.default();
                    this.set({ name: command.name, type: command.type }, command);
                });
            }
        }
    }
}
import { ApplicationCommandOption, CommandInteraction } from 'discord.js';
import { InteractionCommand } from '../../../typings';
import { CommandError } from '../../structs/error/CommandError';
import { config } from '../../util/config';
import { CommandErrors } from '../../util/Constants';
import { memberService } from '../../api/service';

export default class implements InteractionCommand {
    name = 'unban'
    type: 'CHAT_INPUT' = 'CHAT_INPUT'
    roles = [config.roles.admin]
    description = 'Разбанить пользователя.'
    options: ApplicationCommandOption[] = [
        {
            type: 'USER',
            name: 'пользователь',
            description: 'Выберите пользователя, которого хотите разбанить.',
            required: true
        },
    ]


    async exec(interaction: CommandInteraction): Promise<void> {
        const member = interaction.options.getMember('пользователь', true);
        if(!('id' in member)) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }

        await interaction.deferReply({ ephemeral: true });
        const result = await memberService.roleUnban(member.id, interaction.user.id);
        await interaction.editReply({
            content: result.message
        });
    }
}
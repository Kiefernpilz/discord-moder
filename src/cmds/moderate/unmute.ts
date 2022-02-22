import { ApplicationCommandOption, CommandInteraction } from 'discord.js';
import { InteractionCommand } from '../../../typings';
import { CommandError } from '../../structs/error/CommandError';
import { config } from '../../util/config';
import { CommandErrors } from '../../util/Constants';
import { memberService } from '../../api/service';

export default class implements InteractionCommand {
    name = 'unmute'
    type: 'CHAT_INPUT' = 'CHAT_INPUT'
    roles = [config.roles.admin]
    description = 'Снять мут с пользователя.'
    options: ApplicationCommandOption[] = [
        {
            type: 'USER',
            name: 'пользователь',
            description: 'Выберите пользователя, которому хотите снять мут.',
            required: true
        },
    ]


    async exec(interaction: CommandInteraction): Promise<void> {
        const member = interaction.options.getMember('пользователь', true);
        if(!('id' in member)) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }

        await interaction.deferReply({ ephemeral: true });
        const result = await memberService.unmute(member.id, interaction.user.id);
        await interaction.editReply({
            content: result.message
        });
    }
}
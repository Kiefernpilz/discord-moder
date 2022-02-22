import { ApplicationCommandOption, CommandInteraction } from 'discord.js';
import { InteractionCommand } from '../../../typings';
import { CommandError } from '../../structs/error/CommandError';
import { config } from '../../util/config';
import { CommandErrors } from '../../util/Constants';
import { memberService } from '../../api/service';

export default class implements InteractionCommand {
    name = 'ban'
    type: 'CHAT_INPUT' = 'CHAT_INPUT'
    roles = [config.roles.admin]
    description = 'Забанить пользователя.'
    options: ApplicationCommandOption[] = [
        {
            type: 'USER',
            name: 'пользователь',
            description: 'Выберите пользователя, которого хотите забанить.',
            required: true
        },
        {
            type: 'STRING',
            name: 'причина',
            description: 'Укажите причину бана.',
            required: true
        }
    ]
    cooldown = 36e5 * 3

    async exec(interaction: CommandInteraction): Promise<void> {
        const member = interaction.options.getMember('пользователь', true);
        if(!('id' in member)) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }

        const reason = interaction.options.getString('причина', true);

        await interaction.deferReply({ ephemeral: true });
        const result = await memberService.ban(member.id, interaction.user.id, reason);
        await interaction.editReply({
            content: result.message
        });
    }
}
import { ApplicationCommandOption, CommandInteraction } from 'discord.js';
import { InteractionCommand } from '../../../typings';
import { CommandError } from '../../structs/error/CommandError';
import { config } from '../../util/config';
import { CommandErrors } from '../../util/Constants';
import { memberService } from '../../api/service';

export default class implements InteractionCommand {
    name = 'mute'
    type: 'CHAT_INPUT' = 'CHAT_INPUT'
    roles = [config.roles.admin, config.roles.moder]
    description = 'Выдать мут пользователю.'
    options: ApplicationCommandOption[] = [
        {
            type: 'USER',
            name: 'пользователь',
            description: 'Выберите пользователя, которому хотите выдать мут.',
            required: true
        },
        {
            type: 'INTEGER',
            name: 'время',
            description: 'Укажите время мута (в минутах).',
            required: true
        },
        {
            type: 'STRING',
            name: 'причина',
            description: 'Укажите причину мута.',
            required: true
        },
    ]
    cooldown = 36e5


    async exec(interaction: CommandInteraction): Promise<void> {
        const member = interaction.options.getMember('пользователь', true);
        if(!('id' in member)) {
            throw new CommandError(CommandErrors.USER_INVALID);
        }

        const reason = interaction.options.getString('причина', true);
        const duration = interaction.options.getInteger('время', true);

        await interaction.deferReply({ ephemeral: true });
        const result = await memberService.mute(member.id, interaction.user.id, { reason, duration });
        await interaction.editReply({
            content: result.message
        });
    }
}
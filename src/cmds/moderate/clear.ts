import { ApplicationCommandOption, CommandInteraction, TextChannel } from 'discord.js';
import { BotMessages } from '../../util/Constants';
import { InteractionCommand } from '../../../typings';
import { config } from '../../util/config';

export default class implements InteractionCommand {
    name = 'clear'
    type: 'CHAT_INPUT' = 'CHAT_INPUT'
    roles = [config.roles.admin]
    description = 'Удалить сообщения.'
    options: ApplicationCommandOption[] = [
        {
            type: 'INTEGER',
            name: 'количество',
            description: 'Введите количество сообщений.',
            required: true
        },
    ]


    async exec(interaction: CommandInteraction): Promise<void> {
        let amount = Math.abs(interaction.options.getInteger('количество', true));

        await interaction.deferReply({ ephemeral: true });

        for(let i = 0; i < Math.ceil(amount / 100); ++i) {
            const channel = interaction.channel as TextChannel;
            const messages = await channel.messages.fetch({ limit: amount > 100 ? 100 : amount });

            await channel.bulkDelete(messages).catch(() => null);

            amount -= 100;
        }

        await interaction.editReply({
            content: BotMessages.SUCCESS
        });
    }
}
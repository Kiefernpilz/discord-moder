import { ApplicationCommandOption, CommandInteraction, MessageEmbed } from 'discord.js';
import { InteractionCommand } from '../../../typings';
import { config } from '../../util/config';
import { BotMessages } from '../../util/Constants';

export default class implements InteractionCommand {
    name = 'say'
    type: 'CHAT_INPUT' = 'CHAT_INPUT'
    roles = [config.roles.admin]
    description = 'Сообщение от имени бота (text).'
    options: ApplicationCommandOption[] = [
        {
            type: 'STRING',
            name: 'текст',
            description: 'Укажите текст.',
            required: true
        },
        {
            type: 'STRING',
            name: 'картинка',
            description: 'Укажите ссылку на картинку.',
            required: false
        }
    ]


    async exec(interaction: CommandInteraction): Promise<void> {
        const description = interaction.options.getString('текст', true);
        const image = interaction.options.getString('картинка');

        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            content: BotMessages.SUCCESS
        });

        await interaction.channel?.send({
            content: description,
            files: image ? [image] : undefined
        });
    }
}
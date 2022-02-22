import { ApplicationCommandOption, CommandInteraction, MessageEmbed } from 'discord.js';
import { InteractionCommand } from '../../../typings';
import { config } from '../../util/config';
import { BotMessages } from '../../util/Constants';

export default class implements InteractionCommand {
    name = 'announce'
    type: 'CHAT_INPUT' = 'CHAT_INPUT'
    roles = [config.roles.admin]
    description = 'Сообщение от имени бота (embed).'
    options: ApplicationCommandOption[] = [
        {
            type: 'STRING',
            name: 'заголовок',
            description: 'Укажите заголовок.',
            required: true
        },
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
        const title = interaction.options.getString('заголовок', true);
        const description = interaction.options.getString('текст', true);
        const image = interaction.options.getString('картинка');

        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            content: BotMessages.SUCCESS
        });
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor('#2F3136')
        if(image) {
            embed.setImage(image);
        }

        await interaction.channel?.send({
            embeds: [ embed ]
        });
    }
}
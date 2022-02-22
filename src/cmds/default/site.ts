import { ApplicationCommandOption, CommandInteraction, MessageEmbed } from 'discord.js';
import { InteractionCommand } from '../../../typings';

export default class implements InteractionCommand {
    name = 'site'
    type: 'CHAT_INPUT' = 'CHAT_INPUT'
    roles = []
    description = 'сайт.'
    options: ApplicationCommandOption[] = []


    async exec(interaction: CommandInteraction): Promise<void> {
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle('asd')
                    .setDescription('321')
                    .setColor('#2F3136')
            ]
        });
    }
}
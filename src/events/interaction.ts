import { Event } from '../../typings';
import { Interaction, MessageEmbed, TextChannel, Collection } from 'discord.js';
import { CommandError } from '../structs/error/CommandError';
import { CommandErrors } from '../util/Constants';
import { client } from '../index';
import { getGuild, isInteractionCommand } from '../util/util';
import { config } from '../util/config';

const cooldowns = new Collection<string, Date>()

export default class implements Event {
    name: 'interactionCreate' = 'interactionCreate'
    async exec(interaction: Interaction): Promise<void> {
        if(interaction.guildId !== getGuild().id) return;

        if(interaction.isCommand()) {
            const command = client.commands.find(command => command.name === interaction.commandName && isInteractionCommand(command))!;
            if(!command) return;
            if(!interaction.member || !('id' in interaction.member)) {
                await interaction.reply({
                    ephemeral: true,
                    content: CommandErrors.USER_INVALID
                });
                return;
            }

            const cmdLog = client.channels.cache.get(config.channels.cmdlog) as TextChannel;

            if(command.roles.length && !interaction.member.roles.cache.some(role => command.roles.includes(role.id)) && !interaction.member.permissions.has('ADMINISTRATOR')) {
                await interaction.reply({
                    ephemeral: true,
                    content: CommandErrors.NOT_ENOUGH_PERMISSION
                });
                return;
            }

            const cooldown = cooldowns.get(`${interaction.member.id}${interaction.commandName}`)
            if(command.cooldown && cooldown && Date.now() - cooldown.getTime() < command.cooldown && !interaction.member.permissions.has('ADMINISTRATOR')) {
                return interaction.reply({
                    ephemeral: true,
                    content: CommandErrors.COOLDOWN
                })
            }

            await cmdLog.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle('Вызов команды')
                        .addField('Название', interaction.commandName, true)
                        .addField('Вызвал', interaction.user.toString(), true)
                        .setTimestamp()
                        .setColor('#2F3136')
                ]
            })

            try {
                if(command.type === 'CHAT_INPUT') {
                    await command.exec(interaction);
                    if (command.cooldown) {
                        cooldowns.set(`${interaction.member.id}${interaction.commandName}`, new Date())
                    }
                }
            } catch(e: unknown) {
                const embed = new MessageEmbed()
                    .setTitle('Ошибочка вышла!')
                    .setDescription(`> ${e instanceof CommandError ? String(e.message) : 'Неизвестная ошибка'}`)
                    .setColor('#2F3136');
                
                if(interaction.replied || interaction.deferred) {
                    await interaction.editReply({
                        content: null,
                        embeds: [ embed ]
                    });
                }
                else {
                    await interaction.reply({
                        ephemeral: true,
                        content: null,
                        embeds: [ embed ]
                    });
                }

                if(e instanceof Error && !(e instanceof CommandError)) {
                    await CommandError.sendLog(e, interaction);
                    console.log(e);
                }
            }
        }
    }
}
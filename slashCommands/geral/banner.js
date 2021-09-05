const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('exibe o banner (foto de capa) de um usuário')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('o usuário para ver o banner')
                .setRequired(true)
        ),

    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction 
     */

    async execute(client, interaction) {

        await interaction.reply({ ephemeral: false });

        let user = await interaction.options.getUser('usuário', true);

        await user.fetch({ force: true });

        let embed = new Discord.MessageEmbed()
            .setColor(user.accentColor)
            .setTitle('Banner de ' + user.tag)
            .setImage(user.bannerURL({ dynamic: true }))

        interaction.editReply({ embeds: [embed] })

    }
}
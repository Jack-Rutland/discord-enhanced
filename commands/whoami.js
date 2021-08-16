const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whoami')
		.setDescription('Replies with your profile!'),
	async execute(interaction) {
		const profileEmbed = new MessageEmbed()
			.setColor(interaction.member.displayHexColor)
			.setTitle(interaction.member.displayName)
			.setDescription(interaction.user.tag)
			.setThumbnail(interaction.user.avatarURL())
			.addFields(
				{ name: 'Joined Discord', value: interaction.user.createdAt.toDateString() },
				{ name: 'Joined ' + interaction.guild.name, value: interaction.member.joinedAt.toDateString() },
			)
			.setImage(interaction.user.avatarURL());
		return interaction.reply({ embeds: [profileEmbed] });
	},
};
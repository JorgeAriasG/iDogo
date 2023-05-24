const { SlashCommandBuilder } = require('discord.js');

module.exports = [
	{
		data: new SlashCommandBuilder()
			.setName('mi-info')
			.setDescription('Te da tu informacion en el servidor.'),
		async execute(interaction) {
			// interaction.user is the object representing the User who ran the command
			// interaction.member is the GuildMember object, which represents the user in the specific guild
			await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
		},
	},
];

// module.exports = {
// 	data: SlashCommandBuilder()
// 		.setName('')
// }
const { REST, Routes } = require('discord.js');
const { discord } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

function registerSlashCommands(guildId) {

	const commands = [];
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(__dirname, '/src/commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for(const file of commandFiles) {
		const command = require(`./src/commands/${file}`);
		if(command.length > 0) {
			command.forEach(cmd => {
				if(cmd.data != null || cmd.data != undefined) {
					commands.push(cmd.data.toJSON());
				}
			});
		}
	}

	// Construct and prepare an instance of the REST module
	const rest = new REST({ version: '10' }).setToken(discord.token);

	// and deploy your commands!
	(async () => {
		try{
			console.log(`Started refreshing ${commands.length} application (/) commands for: ${guildId}.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(discord.clientId, guildId),
				{ body: commands },
			);

			// console.log(`Commands reloaded: ${JSON.stringify(commands)}`);

			console.log(`Successfully reloaded ${data.length} application (/) commands for: ${guildId}.`);
		}catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
}

module.exports = registerSlashCommands;
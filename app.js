// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { discord } = require('./config.json');
const registerSlashCommands = require('./deployment-commands');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, '/src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if(command.length > 0) {
	command.forEach(cmd => {
		if('data' in cmd && 'execute' in cmd) {
			client.commands.set(cmd.data.name, cmd);
		} else {
			console.log(`[WARNING]: The command at ${filePath} is missing a required "data" or "execute" property`);
		}
	});
  }
  // Set a new item in the Collection with the key as the command name and the value as the exported module
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	const guilds = c.guilds.cache;
	guilds.forEach((guild) => {
		registerSlashCommands(guild.id);
	});

	console.log(`Ready! Logged in as ${c.user.tag}`);
	// c.user.setPresence({ activities: [{ name: 'ChatGPT' }], status: 'idle' });
	if(c.user.username != 'PerroBot-Beta') {
		c.user.setUsername('PerroBot-Beta')
			.then(() => console.warn('New name seted'))
			.catch((error) => console.error({ error }));
	}
});

// Listen for a command request from the discord user
client.on(Events.InteractionCreate, async interaction => {
	if(!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if(!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error('AppError: ' , error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		process.exit();
	}
});

client.on(Events.GuildCreate, guild => {
	console.log('New guild detected: ' , guild.name);
	registerSlashCommands(guild.id);
});

// Log in to Discord with your client's token
client.login(discord.token);

module.exports = client;


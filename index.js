const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//	Fetches all command files and loads them
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

//	Runs once when bot is ready
client.once('ready', () => {
	console.log('Discord Enhanced Live');
});

//	Handles all commands loaded at the beginning
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (!client.commands.has(commandName)) return;

	try {
		await client.commands.get(commandName).execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command! Contact Joe!', ephemeral: true });
	}
});

client.login(token);
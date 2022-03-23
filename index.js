const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'spoutdl') {
		await spoutdl(interaction);
	}
});

function spoutdl(interaction){
	if(parseURL(interaction.options.getString("url"))){
		//TODO : Un vrai download...
	}else{
		interaction.reply("Invalid URL !")
	}
}

function parseURL(url){
	if(url.includes("https://youtube.com") || url.includes("https://youtu.be")){

	}
}

function dl_ytb(url){
	
}

client.login(token);
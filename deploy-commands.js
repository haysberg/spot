const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

var env = process.env.NODE_ENV || 'development';

const spoutdl = new SlashCommandBuilder()
.setName('spoutdl')
.setDescription('Downloads Spotify or YouTube songs from link !')
.addStringOption(option =>
    option.setName('url')
        .setDescription('URL of YT Video / Playlist, or Spotify Album / Playlist / Song')
        .setRequired(true))
.addStringOption(option =>
    option.setName('format')
        .setDescription('Output file format')
        .addChoice('mp3', 'mp3')
		.addChoice('flac', 'flac')
		.addChoice('opus', 'opus'));


const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    spoutdl
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

if (env == "production"){
    rest.put(
        Routes.applicationCommands(clientId),
        { body: commands },
    ).then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}else{
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
    
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
    
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}

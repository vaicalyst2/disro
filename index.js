const { Client } = require('discord.js-commando');
const { join } = require('path');
const expressServer = require('./backend/server/exprserver.js');

// Require dotenv for accessing environment variables
require('dotenv').config();

// Create a new Discord client
const bot = new Client({
    commandPrefix: process.env.BOT_PREFIX,
    owner: process.env.OWNER_ID
});

// Register commands
bot.registry
    .registerDefaults()
    .registerGroup('mod', 'Moderation', true)
    .registerCommandsIn({
        dirname: join(__dirname, 'commands'),
        excludeDirs: /_\w+\.?/
    });

// Log in once the bot is ready
bot.once('ready', () => {
    console.log('Bot up!');
});

// Start the express server
expressServer.start();

// Log in using the bot token from environment variables
bot.login(process.env.BOT_TOKEN);

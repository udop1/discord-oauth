const fetch = require('node-fetch');

const { botToken } = require('../config.json');

async function getBotGuilds() {
    const response = await fetch("http://discord.com/api/users/@me/guilds", {
        method: 'GET',
        headers: {
            Authorization: `Bot ${botToken}`
        }
    });

    return response.json();
}

module.exports = { getBotGuilds };
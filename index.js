const settings = require("./config.json");

const Discord = require('discord.js');

const client = new Discord.Client();

// console.log(settings.token);
// console.log(settings.prefix);

client.on('ready', () => {
    client.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
    });
});

client.on('message', message => {
    // If the message is "ping"
    if (message.content === 'ping') {
      // Send "pong" to the same channel
      message.channel.send('pong');
    }
  });

client.login(settings.token);
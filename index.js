const Discord = require('discord.js');

const client = new Discord.Client();
const util = require('util');
const settings = require('./config.json');

// scripts imported
const emojis = require('./emoji.json');
const helpers = require('./scripts/Helpers');

client.on('ready', () => {
  client.generateInvite(['ADMINISTRATOR']).then((link) => {
    console.log(link);
  });
});

client.on('error', (error) => {
  console.log(`error occured: ${util.inspect(error)}`);
});

client.on('message', (message) => {
  // Every time the server is messaged (no matter the channel) these events occur
  const messageCheck = message.content.toLowerCase();

  if (messageCheck.includes('bad bot')) {
    message.channel.send('👿');
  }

  if (messageCheck.includes('good bot')) {
    message.channel.send('👼');
  }

  // If a message has attachment(s)
  const attachments = [...message.attachments.keys()];
  if (attachments.length) {
    attachments.forEach((attachment) => {
      if (message.channel.id === settings.downloadChannel) {
        helpers.downloadToMemory(message.attachments.get(attachment).url);
      }
    });
  }
});

client.login(settings.token);

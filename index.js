// const Discord = require('discord.js');
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents:
    [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ]
});

// scripts imported
import settings from './config.json' assert {type: 'json'};
import emojis from './emoji.json' assert {type: 'json'};
import { downloadToMemory, randomTag } from './scripts/helpers.js';

client.on('ready', () => {
  // Commenting this out as the previous usage is deprecated. Create a new link manually if needed.
  // client.generateInvite(['ADMINISTRATOR']).then((link) => {
  //   console.log(link);
  // });
});

client.on('messageCreate', (message) => {
  // Every time the server is messaged (no matter the channel) these events occur
  const messageCheck = message.content.toLowerCase();

  if (messageCheck.includes('bad bot')) {
    message.react('👿');
  }

  if (messageCheck.includes('good bot')) {
    message.react('👼');
  }

  // If a message has attachment(s)
  const attachments = [...message.attachments.keys()];
  if (attachments.length) {
    attachments.forEach((attachment) => {
      if (message.channel.id === settings.downloadChannel) {
        downloadToMemory(message.attachments.get(attachment).url);
      }
    });
  }
});

client.login(settings.token);

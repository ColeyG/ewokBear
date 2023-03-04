import { Client, GatewayIntentBits } from 'discord.js';
import { CronJob } from 'cron';

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
import emojis from './scripts/emoji.json' assert {type: 'json'};
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

  emojis.forEach((emoji) => {
    emoji.tags.forEach((tag) => {
      if (tag.length > 3) {
        if (messageCheck.includes(tag)) {
          if (Math.random() * 100 > 95) {
            message.react(emoji.emoji);
          }
        }
      }
    });
  });

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

new CronJob("00 05 20 * * 5", async () => {
  const channel = client.channels.cache.get(`${settings.recurringMessageChannel}`);

  channel.send({ "files": ["./friday.mp4"] });
}, null,
  true,
  'America/Toronto');

new CronJob("00 00 08 * * 1", async () => {
  const channel = client.channels.cache.get(`${settings.recurringMessageChannel}`);

  channel.send({ "files": ["./monday.mp4"] });
}, null,
  true,
  'America/Toronto');

client.login(settings.token);

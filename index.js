const Discord = require('discord.js');

const client = new Discord.Client();
const util = require('util');
const settings = require('./config.json');

// scripts imported
const emojis = require('./emoji.json');
const discipline = require('./scripts/Discipline');
const helpers = require('./scripts/Helpers');
const funmsg = require('./scripts/Responses.json');

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
  const checks = Object.keys(funmsg);

  // Check if there is an applicable emote to send after a message (this is sort of spam)
  for (let i = 0; i < emojis.length; i++) {
    if (messageCheck.includes(emojis[i].aliases)) {
      if (Math.random() * 10 > 9 && emojis[i].aliases[0].length > 2) {
        message.channel.send(emojis[i].emoji);
      }
    }
  }

  // for each element in the Responses.json, the corresponding message is sent.
  checks.forEach((check) => {
    if (messageCheck.includes(check)) {
      message.channel.send(funmsg[check]);
    }
  });

  if (messageCheck.includes('like') && messageCheck.includes('give')) {
    message.channel.send('👍');
  }

  if (messageCheck.includes('bad bot')) {
    message.channel.send('👿');
    discipline.botDiscipline('bad');
  }

  if (messageCheck.includes('good bot')) {
    message.channel.send('👼');
    discipline.botDiscipline('good');
  }

  if (messageCheck.includes('thanks') || messageCheck.includes('thnx')) {
    if (messageCheck.includes('ewok')) {
      message.channel.send('😎');
    }
  }

  if (messageCheck.includes('ewok') && messageCheck.includes('shitpost')) {
    message.channel.send('https://imgur.com/random');
  }

  // Randomly send an emoji sometimes (also spam)
  if (Math.floor(Math.random() * 500) === 0) {
    message.channel.send(emojis[Math.floor(Math.random() * emojis.length)].emoji);
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

client.on('messageDelete', (message) => {
  console.log(`${message.member.user.tag}'s post was deleted`);
  const name = message.member.user.tag;
  // message.channel.send(name + "'s post was deleted!... I saw that ...");
});

client.on('guildMemberAdd', (member) => {
  // when a user is added, these events fire
  const channel = member.guild.channels.find((ch) => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Get out, ${member}`);
});

client.login(settings.token);

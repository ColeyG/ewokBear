const Discord = require('discord.js');

const client = new Discord.Client();
const util = require('util');
const settings = require('./config.json');

// scripts imported
const emojis = require('./emoji.json');
const discipline = require('./scripts/Discipline');
const miscMessages = require('./scripts/MiscMessages');
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

  // General message checks
  miscMessages.miscMessages(messageCheck, checks, message);

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

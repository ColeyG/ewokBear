const settings = require("./config.json");
const Discord = require('discord.js');
const client = new Discord.Client();
const util = require('util');
const fs = require('fs');
const https = require('https');

// scripts imported
const emojis = require('./emoji.json');
const discipline = require('./scripts/Discipline');
const funmsg = require('./scripts/Responses.json');

client.on('ready', () => {
  client.generateInvite(["ADMINISTRATOR"]).then(link => {
    console.log(link);
  });
});

client.on('error', (error) => {
  console.log('error occured: ' + util.inspect(error));
});

const randomTag = (length) => {
  let result = '';
  const characters = 'abcdefghjklmnpqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const downloadToMemory = (url) => {
  console.log(url);
  let fileName = url.split("/");
  fileName = fileName[fileName.length - 1];
  const file = fs.createWriteStream(`memory/attachments/${randomTag(5)}-${fileName}`);
  const request = https.get(url, function (response) {
    response.pipe(file);
  });
}

client.on('message', message => {
  // Every time the server is messaged (no matter the channel) these events occur
  let messageCheck = message.content.toLowerCase();
  let checks = Object.keys(funmsg);

  // Check if there is an applicable emote to send after a message (this is sortof spam)
  for (let i = 0; i < emojis.length; i++) {
    if (messageCheck.includes(emojis[i].aliases)) {
      if (Math.random() * 10 > 9 && emojis[i].aliases[0].length > 2) {
        message.channel.send(emojis[i].emoji);
      }
    }
  }

  // for each element in the Responses.json, the corresponding message is sent.
  checks.forEach(element => {
    if (messageCheck.includes(element)) {
      message.channel.send(funmsg[element]);
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
  if (Math.floor(Math.random() * 500) == 0) {
    message.channel.send(emojis[Math.floor(Math.random() * emojis.length)].emoji);
  }

  // If a message has attachment(s)
  const attachments = [...message.attachments.keys()];
  if (attachments.length) {
    attachments.forEach((attachment) => {
      downloadToMemory(message.attachments.get(attachment).url);
    })
  }
});

client.on('messageDelete', message => {
  console.log(message.member.user.tag);
  let name = message.member.user.tag;
  // message.channel.send(name + "'s post was deleted!... I saw that ...");
});

client.on('guildMemberAdd', member => {
  // when a user is added, these events fire
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Get out, ${member}`);
});

client.login(settings.token);

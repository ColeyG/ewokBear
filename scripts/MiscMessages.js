const emojis = require('../emoji.json');
const discipline = require('./Discipline');

exports.miscMessages = function miscMessages(messageCheck, checks, message) {
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
};

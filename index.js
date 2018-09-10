const settings = require("./config.json");

const Discord = require('discord.js');

const client = new Discord.Client();

const emojis = require('./emoji.json');

// console.log(settings.token);
// console.log(settings.prefix);

client.on('ready', () => {
    client.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
    });
});

client.on('message', message => {
    //Every time the server is messaged (no matter the channel) these events occur
    let messageCheck=message.content.toLowerCase();

    if (messageCheck.includes('like')) {
      message.channel.send('👍');
    }

    if (messageCheck.includes('bad bot')) {
        message.channel.send('👿');
    }

    if (messageCheck.includes('good bot')) {
        message.channel.send('👼');
    }

    if (messageCheck.includes('sad')) {
        message.channel.send('😭');
    }

    if (messageCheck.includes('rip')) {
        message.channel.send('⚰️');
    }

    if (messageCheck.includes('thanks')||messageCheck.includes('thnx')) {
        message.channel.send('😎');
    }

    if (messageCheck.includes('ewok')&&messageCheck.includes('daily')&&messageCheck.includes('shitpost')){
        message.channel.send('https://imgur.com/random');
    }

    if(Math.floor(Math.random()*500)==0){
        message.channel.send(emojis[Math.floor(Math.random()*emojis.length)].emoji);
    }

});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Get out, ${member}`);
});

client.login(settings.token);
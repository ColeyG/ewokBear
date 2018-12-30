const settings = require("./config.json");
const Discord = require('discord.js');
const client = new Discord.Client();
const util = require('util'); 

//scripts imported
const emojis = require('./emoji.json');
const discipline = require('./scripts/Discipline');
const funmsg = require('./scripts/Responses.json');

client.on('ready', () => {
    client.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
    });
});

client.on('error',(error)=>{
    console.log('error occured: '+ util.inspect(error));
});

client.on('message', message => {
    //Every time the server is messaged (no matter the channel) these events occur
    let messageCheck=message.content.toLowerCase();
    let checks=Object.keys(funmsg);

    for(let i=0;i<emojis.length;i++){
        if(messageCheck.includes(emojis[i].aliases)){
            console.log();
            if(Math.random()*10>9&&emojis[i].aliases[0].length>2){
                message.channel.send(emojis[i].emoji);
            }
        }
    }

    //for each element in the Responses.json, the corresponding message is sent.
    checks.forEach(element => {
        if (messageCheck.includes(element)){
            message.channel.send(funmsg[element]);
        }
    });

    if(messageCheck.includes('like')){
        if(messageCheck.includes('give')){
            message.channel.send('👍');
        }
    }

    if (messageCheck.includes('bad bot')) {
        message.channel.send('👿');
        discipline.botDiscipline('bad');
    }

    if (messageCheck.includes('good bot')) {
        message.channel.send('👼');
        discipline.botDiscipline('good');
    }

    if (messageCheck.includes('thanks')||messageCheck.includes('thnx')) {
        if (messageCheck.includes('ewok')){
            message.channel.send('😎');
        }
    }

    if (messageCheck.includes('ewok')&&messageCheck.includes('shitpost')){
        message.channel.send('https://imgur.com/random');
    }

    if(Math.floor(Math.random()*500)==0){
        message.channel.send(emojis[Math.floor(Math.random()*emojis.length)].emoji);
    }
});

client.on('messageDelete',message=>{
    message.channel.send("Someone deleted something!... I saw that ...");
});

client.on('guildMemberAdd', member => {
    //when a user is added, these events fire
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Get out, ${member}`);
});

client.login(settings.token);
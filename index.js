/* eslint-disable no-unused-vars */
// require the discord.js module
const fs = require('fs');
const Discord = require('discord.js');

// create a new Discord client
// define consts
const {prefix, token} = require('./config.json');
const { TIMEOUT } = require('dns');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Online');
    client.user.setActivity("Splatoon 3", {type: "PLAYING"})
});

client.on('message', message => {

    //ignore commands in DM, from other bot users, and from self
    if (message.channel.type === 'dm') return;
    if (message.author.bot) return;
    

    //commands below this line activate on word, no prefix


    //ignore captain window
    if(message.author.id === '506198269404250112') return;

    //ignore camilla
    if(message.author.id === '412376526605254657') return;

    //react with ping emoji on @everyone
    if (message.mentions.everyone) {
            message.channel.send('<:ping:737714436504289341>');
            message.react('<:ping:737714436504289341>');
    }

    //react with ping emoji on direct mention
    //account for PC pings and mobile pings respectively (which are different for some reason)
    else if (message.content.includes('<@!765941875424624640>') || message.content.includes('<@765941875424624640>')){
            message.channel.send('<:ping:737714436504289341>');
            message.react('<:ping:737714436504289341>');
    }
    if (message.content.toLowerCase().includes('ping')) {
    //if(message.content.toLowerCase().startsWith('ping')) {
        message.react('<:ping:737714436504289341>');
    }

    else if(message.content.toLowerCase().includes('red sus')){
            message.react('<:crewmate_red:804040823347216404>');
    }

    else if(message.content.toLowerCase().includes('sus')) {
        message.react('<:sus:784978860277497896>');        
    }
    
    else if(message.content.toLowerCase().includes('pog')){
        message.react('<:pog:808464507998437386>')
    }

    else if(message.content.toLowerCase().includes('freg')) {
        message.react('<:Freg:788498159672229959>');
    }

    else if(message.content.toLowerCase().includes('anime')) {
        message.channel.send('anime bad');
    }

    else if(message.content.toLowerCase().includes('bob')){
        message.react('<a:bobdance:766716692087832578>');
    }

    else if(message.content.toLowerCase().includes("twitter")){
        message.react('🤮')
    }

    else if(message.content.toLowerCase().includes('rickroll')){
        message.channel.send('https://tenor.com/view/dance-moves-dancing-singer-groovy-gif-17029825');
    }

    else if(message.content.toLowerCase() === 'hello there'){
        message.channel.send('General Kenobi');
    }

    else if(message.content.toLowerCase().includes('subscribe')){
        message.channel.send('SUBSCRIBE TO FLAMEATGAMES OR I WILL CANCEL YOU ON TWITTER\nhttps://www.youtube.com/flameatgames');
    }

    else if(message.content.toLowerCase().includes('dead chat')){
        message.channel.send("Dead chat XD");
    }

    //PREFIX COMMANDS START HERE, COMMANDS ABOVE THIS DON'T USE PREFIXES AND INSTEAD REACT ON WORD
    if (!message.content.startsWith(prefix) || message.author.bot) return; //ignore messages that dont start with ! or are sent by another bot
    const args = message.content.slice(prefix.length).trim().split(/ +/); //remove the ! from the command when reading command
    const command = args.shift().toLowerCase(); //make command not case sensitive

    //send bot ping
    if (command === 'ping') {
            message.channel.send(`pong! Average response time: ${client.ws.ping}ms.`);
    }

    //help command
    else if (command === 'help') {
            message.channel.send("I've DMed you my commands.");
            message.author.send("These are my commands as of 1/31/2021\nYou can find more information here: https://discord.gg/AqgsUA4Q5P");
            message.author.send("https://media.discordapp.net/attachments/763786268181397527/808163984196501564/unknown.png");
    }

    //is bob tennis online?
    else if (command === 'online') {
            message.channel.send("I'm online");
    }
    
    //send bob
    else if (command === 'bob') {
            message.channel.send('Bob Tennis <a:bobdance:766716692087832578>');
            message.react('<a:bobdance:766716692087832578>')
    }

    //send server information including server name and member count
    else if (command === 'server') {
            message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nNOTE: This number includes any bot users like myself`);
    }
        
    //send dogger pogger
    else if (command === 'dog') {
            message.channel.send('https://cdn.discordapp.com/emojis/787820859426996274.png?v=1');
    }

    //send avatar list
    else if (command === 'avatar') {
            if (!message.mentions.users.size) {
                return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
            }
        
            const avatarList = message.mentions.users.map(user => {
                return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
            });
        
            // send the entire array of strings as a message
            // by default, discord.js will `.join()` the array with `\n`
            message.channel.send(avatarList);
    }

    else if(command === 'play'){
            const ytdl = require('ytdl-core');
            message.channel.send("This command is experimental\nI'll attempt to play ` " + args[0] + " ` \nThis will only work if you supplied a YouTube link")
            message.member.voice.channel.join().then(connection => {
            const stream = ytdl(args[0], { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            dispatcher.on('finish', () => message.member.voice.channel.leave());
        })
    }

    //leave voice channel
    else if (command === 'leave') {
            const connection = message.member.voice.channel.leave();
            message.channel.send("I have left the voice channel");
    }

    //send server invite
    else if (command === 'invite') {
           message.channel.send("Join my testing server here!\nhttps://discord.gg/NC6tyXeSBx");
    }

    else if (command === 'skill') {
        message.channel.send('https://media.discordapp.net/attachments/702520630477586502/808429833839312897/gnwDefaultDance.gif')
    }

    else if (command === 'fundies') {
        message.channel.send('https://media.discordapp.net/attachments/753418812090744873/774391251650084884/image0.gif')
    }


    //commands below are limited to me
    
    //shut down the bot
    else if (command === 'stop') {
            if (message.author.id !== '365593459236667393') {
            message.reply("This command is limited to Kingamezz"); return;
            }
            message.channel.send("shutting down now");
            process.exit();
    }

    //list servers in console
    else if (command === 'serverlist') {
        if(message.author.id !== '365593459236667393') return;
        client.guilds.cache.forEach(guild => {
            console.log(`${guild.name} | ${guild.id}`);
            })
            message.channel.send("I've logged the list of servers I'm in, check the console");
    }


    //send NO
    else if (command === 'no') {
        if (message.author.id !== '365593459236667393') {
                return;
            }
            //message.delete({ timeout: 50});
            message.channel.send('<:NO:737712914638700565>');
    }

    //leave the server
    else if (command === 'leaveserver') {
            if (message.author.id !== '365593459236667393') {
                message.reply("This command is limited to Kingamezz"); return;
                }
                    message.channel.send("Leaving the server now");
                    message.guild.leave();
    }


        
}); //the final closing brackets


// login to Discord with your app's token
//all code should be above this line
client.login(token);
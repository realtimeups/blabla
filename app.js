/*jshint esversion: 6 */

const Discord = require('discord.js');
const figlet = require('figlet');
const colors = require('colors');
const readline = require('readline');
const commando = require(`discord.js-commando`);
const config = require('./config.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var moment = require('moment-hijri');
moment().format('iYYYY/iM/iD');
var jalaali = require('jalaali-js');
var cron = require('node-cron');
const bot = new commando.Client({
    commandPrefix:'gw!',
    owner: config.id
});

const cmdsArray = [
    "dmall <message>",
    "dmrole <role> <message>"
];
const serverStats = {
    guildID: '705047940565303408'
};


bot.on("ready", () => {
    clear();
    console.log('______');

    setInterval(function status(){
        let myGuild = bot.guilds.get('727922401257586719');
        let memberCount = myGuild.memberCount;
        console.log(`${memberCount}`)
        let statuses = ["M A J E S T I C",`Now ${memberCount} Members with Us 🤩❤️`,"Join Us","discord.gg/UqkuN2Dq"];
        let status = Math.floor(Math.random() * statuses.length)
        bot.user.setActivity(statuses[status], {type: 'PLAYING'});
    },60000)
    cron.schedule('*/15 * * * *', () => {
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/" 
        + currentdate.getFullYear()  
        var d = currentdate.getDate();
        var m = currentdate.getMonth();
        var y = currentdate.getFullYear();
        var pc = jalaali.toJalaali(y,m,d);
        var jd = pc.jd;
        var jm = pc.jm +1;
        var jy = pc.jy;

        let myGuild = bot.guilds.get('727922401257586719');
        let datechannel = myGuild.channels.get('776578078443962427');
        let datepchannel = myGuild.channels.get('776578117765824533');
        datepchannel.setName('📅 Date: '+ jy + '/' + jm + '/'+jd )
        datechannel.setName('📅 Date: '+ datetime )
        console.log('📅 Date: '+ jy + '/' + jm + '/'+jd +'📅 Date: '+ datetime );

      });
//    bot.user.setActivity('GREENWICH SERVER', { url: "https://github.com/alexlyee/massdm", type: 'WATCHING' })
//        .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
//        .catch(console.error);
    
});


bot.on("error", (error) => {
    bot.login(config.token);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

bot.registry.registerGroup('dms', 'help');
bot.registry.registerGroup('voice', 'Voice');
bot.registry.registerGroup('rainbow', 'rainbow');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

if (process.env.TESTING) process.exit();

try {
    if (process.env.BOT_TOKEN) bot.login(process.env.BOT_TOKEN);
    else bot.login(config.token);
}
catch (e) {
    console.log(e);
    console.log("Failed to login to Discord!");
}



function clear() {
    console.clear();
    console.log(figlet.textSync("TimeUpS").red); // just in case it wasn't obvious, this is a beta
    console.log(`\nRandom send time set @ 0.01-${config.wait}s`);
    console.log(` Type  ${config.prefix}help  in a chat.\n\n`);
}

const discord = require('discord.js');
const MrBuzzYT = new discord.Client();
const commando = require('discord.js-commando');
const app = require('../../app.js');
const config = require('../../config.json');
const Discord = require('discord.js');
const util = require('util');
const bot = new Discord.Client()
const { Client, Permissions } = require('discord.js');

class RainBowRoleCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: `rainbow`,
            group: 'rainbow',
            memberName: 'rainbow',
            description: 'type to rainbow to make rainbow role',
            examples: [ `${config.prefix}rainbow ` ],
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR']
        });
    }

    async run(message, args){
        const rolez = message.mentions.roles.first() || message.guild.roles.find(r=> r.name === args [1])
        if(!rolez) return message.channel.send(config.messageresponse.rolenotfound).catch(err=> message.channel.send("No response"))
//        if(!message.guild.member(bot.user.id).hasPermission("MANAGE_ROLES")) return message.channel.send(config.messageresponse.missingperm).catch(err=> message.channel.send("no response"))
        var colors = config.rainbowrole
        var rolestart = setInterval(function() {
            var colorsz = colors[Math.floor(Math.random() * colors.length)];
            rolez.setColor(colorsz)
        }, config.rainbowdelay); 
            message.channel.send(config.messageresponse.success).catch(err=> message.channel.send("No response"))
/*              if(config.prefix + config.rainbowstop) {
                setTimeout(function () {
               process.exit()
                }, 1000);
               
                           config.channel.send(config.messageresponse.rainbowstop).catch(err=> message.channel.send("No response"))
                           }  */
    }

    }



module.exports = RainBowRoleCommand;
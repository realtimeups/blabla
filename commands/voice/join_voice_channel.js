const commando = require('discord.js-commando');
const app = require('../../app.js');
const config = require('../../config.json');
const Discord = require('discord.js');
const util = require('util');
const { Client, Permissions } = require('discord.js');

class JoinVoiceChannelCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: `join`,
            group: 'voice',
            memberName: 'join',
            description: 'type to join voice',
            examples: [ `${config.prefix}join ` ],
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR']
        });
    }

    async run(message, args){

        if(message.member.voiceChannel){

            if(!message.guild.voiceConnection){

                message.member.voiceChannel.join()
                    .then(connection => {
                        
                        message.reply("Seccessfully Joined!");
                    })
            }
        }
        else{

            message.reply("You must be in voice channle!!!");
        }
    }
}

module.exports = JoinVoiceChannelCommand;
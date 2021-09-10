const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const botdata = require("../database/models/botlist/bots.js")

exports.run = async(client, message, args) => {
    const botsdata = await botdata.find();
    var botsdata1 = botsdata.sort((a, b) => b.votes - a.votes).slice(0, 6).map(a => `<@${a.botID}> With ${a.votes} Votes, Bot Made By <@${a.ownerID}>`).join("\n");
    
     if(!botsdata1)
     {
       var botsdata1 = "no bots";
     }
        const embed = new Discord.MessageEmbed()
       .setTitle("Top Voted Bots In A Week")
       .setDescription(`**Total 6 bots found and Here are Winners.**`)
       .setColor("#36393E")
       .addField("Bots", `${botsdata1}`, true)
       message.channel.send(embed)
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "topvotedbots",
    description: "",
    usage: ""
  };
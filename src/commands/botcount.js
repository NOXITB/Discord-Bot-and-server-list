const Discord = require('discord.js')
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
    let x = await botdata.find();
    let bots = x.filter(x => x.status === "Approved")
    const embed = new Discord.MessageEmbed()
 .setDescription(`There are ${bots.length} Bots In the botlist`)
 .setColor('BLURPLE')
   message.channel.send(embed)
};

    exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["botcount"],
  };
  
  exports.help = {
    name: "botcount",
    description: "",
    usage: ""
  };
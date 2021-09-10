const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const botdata = require("../database/models/botlist/bots.js")
const config = require("../../config.js");
 exports.run = async(client, message, args) => {
  let guild1 = client.guilds.cache.get(config.server.id)
   let member1 = guild1.member(message.author.id);
   if(member1.roles.cache.has("847365325594820618") || member1.roles.cache.has("847365325594820618"))
{
   let x = await botdata.find();
   const embed = new Discord.MessageEmbed()
   .setTitle("Upcord Bot list Queue")
 let test = x.filter(a => a.status === "UnApproved");
 if(!test[0])
 {
   return message.channel.send("**Your Job is Done!!**");
 }

 test.map(b => {
   if(!b)
   {
      return embed.setDescription("**Your Job is done!!!**")
   }
    embed.addField(`${b.username}`, `[Invite:](https://discord.com/api/oauth2/authorize?client_id=${b.botID}&permissions=0&scope=bot)`)
  })

  await message.channel.send(embed)
   
 
}



 }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "queue",
    description: "Shows current ",
    usage: ""
  };
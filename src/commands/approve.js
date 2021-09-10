const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const botsdata = require("../database/models/botlist/bots.js")
const config = require("../../config.js");
const db = require("quick.db");
 exports.run = async(client, message, args) => {
  let guild1 = client.guilds.cache.get(config.server.id)
  let guild2 = client.guilds.cache.get(config.server.id2)
   let member1 = guild1.member(message.author.id);
   let member2 = guild2.member(message.author.id);
   if(member1.roles.cache.has("847365325594820618") || member1.roles.cache.has("847365325594820618"))
   
{
   const certirole = "849082418057314334";
   const botrole = "847364865567359006";
   const devrole = "847730047955632149";
   const certidevrole = "849082176573669396";
      
    let bot = message.mentions.users.first()
    if(!bot) {
     bot = client.users.cache.get(args[0])
    }
    if(!bot)
    {
      return message.channel.send("You have given an invalid bot id or mention")
    }
   
    
    const botdata = await botsdata.findOne({ botID: bot.id })
    if(!botdata)
    {
      return message.channel.send("Invalid bot");
    }
    if(botdata.status === "Approved")
    {
      return message.channel.send("This bot is already approved by someone");
    }
await botsdata.findOneAndUpdate({botID: bot.id},{$set: {
              status: "Approved",
              Date: Date.now(),
          }
         })
         if(db.has(`currentsession_${bot.id}`))
         {
           
           let channelid = db.fetch(`currentsession_${bot.id}`);
           if(client.channels.cache.get(channelid))
           {

           
           let channelto = client.channels.cache.get(channelid);
           channelto.delete()
           }
         }
          client.users.fetch(bot.id).then(bota => {
           let approveembed = new Discord.MessageEmbed()
             .setTitle("Bot Approved")
             .setDescription(`Responsible Reviwer: ${message.author}\n Bot: ${bota.username}\n Owner of bot: <@${botdata.ownerID}>`)
             .setFooter("Embed Logs of Administration")
              client.channels.cache.get(channels.botlog).send(approveembed)
              if(client.users.cache.get(botdata.ownerID))
              {
              client.users.cache.get(botdata.ownerID).send(`Your bot named **${bota.tag}** has been approved by ${message.author.tag}.`)
              }
          })
               let guild = client.guilds.cache.get(config.server.id);
         if(guild.member(botdata.botID))
         {
         let bot = guild.member(botdata.botID);
        bot.roles.add(botrole)
         }
         if(guild.member(botdata.ownerID))
         {
         let owner = guild.member(botdata.ownerID);
         owner.roles.add(devrole);
         }
         if(parseInt(botdata.coowners)) {
         
             botdata.coowners.map(a => {
              
               if(guild.members.fetch(a))
               {
                 
              let coowner = guild.member(a);
              if (coowner) coowner.roles.add(devrole);
               }
             })
         }
         let tok = client.guilds.cache.get(config.server.id2);
         let bruhb = tok.member(bot.id);
         bruhb.kick();
    message.reply(`Bot approved! Please add the bot in upcord list server: https://discord.com/oauth2/authorize?client_id=${bot.id}&permissions=0&scope=bot`)

}
 }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "approve",
    description: "Approve bots",
    usage: "[@mention / bot id]"
  };
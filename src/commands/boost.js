const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const botsdata = require("../database/models/botlist/bots.js")
const config = require("../../config.js");
const db = require("quick.db");
 exports.run = async(client, message, args) => {
  let guild1 = client.guilds.cache.get(config.server.id)
  let guild2 = client.guilds.cache.get(config.server.id2)
   let member1 = guild1.member(message.author.id);
   if(member1.roles.cache.has("871963354607005706") || member1.roles.cache.has("847365325594820618"))
   
{
   const certirole = "849082418057314334";
   const botrole = "871957389400743967";
   const devrole = "847730047955632149";
   const certidevrole = "849082176573669396";
   const boostrole = "871963354607005706";
      
    let bot = message.mentions.users.first()
    if (!bot) {
      bot = args[0];
      bot = client.users.cache.get(bot);
    }
    if(!bot)
    {
      return message.channel.send("You have given an invalid bot id or mention")
    }
    if (!bot.bot) {
        return message.channel.send("Mate, please do provide a bot mention/id not a real life user's id");
    }
   
    
    const botdata = await botsdata.findOne({ botID: bot.id })
    if(!botdata)
    {
      return message.channel.send("Bot not found in db");
    }
    if(botdata.boosted === "true")
    {
      return message.channel.send("This bot is already boosted by someone");
      
    }
await botsdata.findOneAndUpdate({botID: bot.id},{$set: {
              boosted: "true",
              Date: Date.now(),
          },
           return: message.channel.send("This Bot has been boosted")
           
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
         let member = message.author.id
          client.users.fetch(bot.id).then(bota => {
           let member = message.author.id
           let approveembed = new Discord.MessageEmbed()
             .setTitle("Bot Boosted")
             .setDescription(`Moderator: ${message.author.username}\n Bot: ${bota.username}\n Owner: <@${botdata.ownerID}>`)
             .setFooter("Embed Logs of Administration")
              client.channels.cache.get('849079385423872021').send(approveembed)
              if(client.users.cache.get(botdata.ownerID))
              {
              client.users.cache.get(botdata.ownerID).send(`Your bot named **${bota.tag}** has been boosted.`)
              }
          })
               let guild = client.guilds.cache.get(config.server.id);
         if(guild.member(botdata.botID))
         {
       
         let bot = guild.member(botdata.botID);
         
        bot.roles.add(botrole)
        member.roles.remove(boostrole);
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
              coowner.roles.add(devrole);
               }
             })
         }
         let tok = client.guilds.cache.get(config.testserver);
         let bruhb = tok.member(bot.id);
         bruhb.kick();
          message.channel.send("");
  let channel = client.channels.cache.get("849079385423872021");
  channel.send(`<@${bot.id}> has been boosted add the bot! Invite link: https://discord.com/oauth2/authorize?client_id=${bot.id}&permissions=0&scope=bot`)

}
 }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "boost",
    description: "Boost bots",
    usage: "[@mention / bot id]"
  };
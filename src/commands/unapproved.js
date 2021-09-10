


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
      
    var bot = message.mentions.users.first()
    if(bot)
    {
      var bot = bot;
    } else {
      var bot = args[0];
     var bot = client.users.cache.get(bot)
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
    if(botdata.status === "UnApproved")
    {
      return message.channel.send("This bot is already UnApproved by someone");
    }
    var reason = args.join(" ")
    .replace(args[0], "");
    if(!reason)
    {
      return message.channel.send("Reason not given");
    }
await botsdata.findOneAndUpdate({botID: bot.id},{$set: {
              status: "UnApproved",
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
             .setTitle("Bot Resubmision Request")
             .setDescription(`Moderator: ${message.author.username}\n Bot: ${bota.username}\n Owner: <@${botdata.ownerID}>\n Reason: ${reason} `)
             .setFooter("Embed Logs of Administration")
              client.channels.cache.get(config.channels.botlog).send(approveembed)
              if(client.users.cache.get(botdata.ownerID))
              {
              client.users.cache.get(botdata.ownerID).send(`Your bot named **${bota.tag}** has been had a Resubmision Request. \nReason: ${reason}`)
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
              coowner.roles.add(devrole);
               }
             })
         }
         let tok = client.guilds.cache.get(config.testserver);
         let bruhb = tok.member(bot.id);
         bruhb.kick();
          message.channel.send("Discord bot Approved");
  let channel = client.channels.cache.get("849079385423872021");
  channel.send(`The bot <@${bot.id}> Has been Approved And Sr Mods and Administrators Please add the bot here. Invite link - https://discord.com/oauth2/authorize?client_id=${bot.id}&permissions=0&scope=bot`)

}
 }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "rs",
    description: "",
    usage: ""
  };
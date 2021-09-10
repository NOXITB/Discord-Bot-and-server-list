const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client();
const config = require("../../config.js");
const { Client, Util } = require("discord.js");
const botsdata = require("../database/models/botlist/bots.js");
const parseMilliseconds = require("parse-ms");

  exports.run = async (client, message, args) => {
    var bot = message.mentions.users.first();
    if (bot) {
      var bot = bot;
    } else {
      var bot = args[0];
      var bot = client.users.cache.get(bot);
    }
    if (!bot) {
      return message.channel.send(
        "You have given an invalid bot id or mention"
      );
    }

    const votes = require("../database/models/botlist/vote.js");
    let botdata = await botsdata.findOne({ botID: bot.id });
    if (!botdata) {
      return message.channel.send("Not a bot");
    }
    let x = await votes.findOne({ user: message.author.id, bot: bot.id });
    if (x) {
      var timeleft = await parseMilliseconds(x.ms - (Date.now() - x.Date));
      var hour = timeleft.hours;
      var minutes = timeleft.minutes;
      var seconds = timeleft.seconds;

      return await message.channel.send(
        `You can vote again in ${hour}h ${minutes}m ${seconds}s`
      );
    }
    await votes.findOneAndUpdate(
      { bot: bot.id, user: message.author.id },
      { $set: { Date: Date.now(), ms: 43200000 } },
      { upsert: true }
    );
    await botsdata.findOneAndUpdate({ botID: bot.id }, { $inc: { votes: 1 } });
    message.channel.send(`You have voted for <@${bot.id}>!`);
    var votedbot = client.users.cache.get(botdata.botID)
      const { MessageEmbed, WebhookClient } = require('discord.js');
const id = '872277743998496778';
const token = '_pZLfGgiEI3O1VRLdCuyDM9bJ8NvolIqh7gYqmdDMiYsD8xlc7bFPUt_qthN4JwirFNb';

const webhook = new Discord.WebhookClient(id, token);
webhook.send(`<:vote:872276124326035466> **${message.author.username}** voted **${botdata.username}** **\`(${botdata.votes + 1} votes)\`**\n https://upcord.xyz/bots/${botdata.botID}`)
  .catch(console.error);}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "vote",
    description: "",
    usage: ""
  };

/*=======================================================================================*/
const Discord = require('discord.js');
const { Client, Collection } = require('discord.js');
const client = (global.Client = new Client());
const config = require('./config.js');
global.config = config;
const fs = require('fs');
client.htmll = require('cheerio');
client.markdownn = require('cheerio');
const request = require('request');
const db = require('quick.db');
let profiledata = require("./src/database/models/profile.js");
let botsdata = require('./src/database/models/botlist/bots.js');
const ms = require('parse-ms');
let serversdata = require('./src/database/models/servers/server.js');


/*=======================================================================================*/

const chalk = require('chalk');
const glob = require('glob');

/*=======================================================================================*/
process.on("unhandledRejection"
, console.error);
require('events').EventEmitter.prototype._maxListeners = 100;
client.komutlar = new Collection();
client.aliases = new Collection();
fs.readdir('./src/commands', (err, files) => {
  if (err) console.error(err);
  console.log(`[upcordlist]: ${files.length} commands loaded.`);
  files.forEach(f => {
    if (!f.endsWith('.js')) return;
    let props = require(`./src/commands/${f}`);
    if (!props.help) return;
    client.komutlar.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
      global.commands = files;
    });
  });
});
client.on('message', async message => {
  if (message.author.bot) return;
  var find = await profiledata.findOne({ userID: message.author.id })
  try {
    var mycoins = find.coins
    await profiledata.findOneAndUpdate({
      userID: message.author.id
    }, {
        $set: {
          coins: parseInt(mycoins) + 1
        }
      })
  } catch (e) {
    if (!find) {
      await new profiledata({
        userID: message.author.id,
        coins: '1',
      }).save()
    }
  }
  let p = config.bot.prefix;
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(p)) return;
  let command = message.content.split(' ')[0].slice(p.length);
  let params = message.content.split(' ').slice(1);
  let cmd;
  if (client.komutlar.has(command)) {
    cmd = client.komutlar.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.komutlar.get(client.aliases.get(command));
  }
  if (cmd) {
    cmd.run(client, message, params, p);
  }
  if (!cmd) return;
});
/*=======================================================================================*/

/*=======================================================================================*/
const claudette = require('./src/database/models/uptime.js');
setInterval(() => {
  claudette.find({}, function(err, docs) {
    if (err) console.log(err);
    if (!docs) return;
    docs.forEach(docs => {
      request(docs.link, async function(error, response, body) {
        if (error) {
          console.error(
            `${
            docs.link
            } has been deleted on uptime system.\nReason: Invalid domain so request failed.`
          );
          await claudette.findOneAndDelete({ code: docs.code });
        }
      });
    });
  });
}, 60000);

client.on('guildMemberRemove', async member => {
  if (member.guild.id !== config.serverID) return;
  claudette.find({ userID: member.id }, async function(err, docs) {
    await docs.forEach(async a => {
      await claudette.findOneAndDelete({
        userID: member.id,
        code: a.code,
        server: a.server,
        link: a.link
      });
    });
  });
});
/*=======================================================================================*/

/*=======================================================================================*/
const votes = require('./src/database/models/botlist/vote.js');
const votesServer = require('./src/database/models/servers/user.js');
client.on('ready', async () => {
  setInterval(async () => {
    let datalar = await votes.find();
    if (datalar.length > 0) {
      datalar.forEach(async a => {
        let süre = a.ms - (Date.now() - a.Date);
        if (süre > 0) return;
        await votes.findOneAndDelete({ bot: a.bot, user: a.user });
      });
    }
  }, 1500000);
    client.config = config;
});
client.on('ready', async () => {
  setInterval(async () => {
    let voteServer = await votesServer.find();
    if (voteServer.length > 0) {
      voteServer.forEach(async a => {
        let süre = 1800000 - (Date.now() - a.date);
        if (süre > 0) return;
        await votesServer.findOneAndDelete({
          guild: a.guild,
          id: a.id,
          date: a.date
        });
      });
    }
  }, 1500000);
});
/*=======================================================================================*/
client.on('presenceUpdate', async (oldPresence, newPresence) => {
  var botdata = await botsdata.findOne({ botID: newPresence.userID });
  if (!botdata) {
    return;
  }

  if (newPresence.guild.id == '847364462876033064') {
    if (botdata.status == 'UnApproved') {
      return;
    }

    if (newPresence.status === 'offline') {
      let uptimerate = db.fetch(`rate_${newPresence.userID}`);

      if (!uptimerate) {
        uptimerate = '99';
        db.set(`rate_${newPresence.userID}`, 99);
      }

      let timetest = db.fetch(`timefr_${newPresence.userID}`);
      timetest = Date.now() - timetest;
      let breh = db.fetch(`lastoffline`);

      if (timetest > 60000) {
        db.set(`presence_${newPresence.userID}`, 'offline');
        db.set(`timefr_${newPresence.userID}`, Date.now());
        db.add(`offlinechecks_${newPresence.userID}`, 1);
        if (breh === newPresence.userID) {
          return;
        }

        /*client.channels.cache
          .get('883501428985954354')
          .send(
            `<@${botdata.ownerID}> Your Bot <@${
            newPresence.userID
            }> went offline, Uptime Rate: ${uptimerate}%`
          );*/
      }
    }
    if (newPresence.status === 'online') {
      let check = db.fetch(`presence_${newPresence.userID}`);
      if (check === 'offline') {
        var uptimerate = db.fetch(`rate_${newPresence.userID}`);

        if (!uptimerate) {
          var uptimerate = '99';
        }

        db.delete(`presence_${newPresence.userID}`, 'online');
        let breh1 = db.fetch(`lastoffline`);
        if (breh1 === newPresence.userID) {
          return db.delete(`lastoffline`);
        }
        let to2 = db.fetch(`timefr_${newPresence.userID}`);
        var timeleft = await ms(Date.now() - to2);
        var hour = timeleft.hours;
        var minutes = timeleft.minutes;
        var seconds = timeleft.seconds;

        db.set(`lastoffline`, newPresence.userID);
        /*client.channels.cache
          .get('883501428985954354')
          .send(
            `<@${
            newPresence.userID
            }> is back online and Uptime Rate: ${uptimerate}%\nIt was Offline for ${hour}h ${minutes}m ${seconds}s`
          );*/
        db.set(`timefr_${newPresence.userID}`, Date.now());
      }
    }
  }
});
client.on('ready', async () => {
  setInterval(async () => {
    var botdata = await botsdata.find();
    if (!botdata) {
      return;
    }
    botdata.forEach(bot => {
      db.add(`checks_${bot.botID}`, 1);
      var check = db.fetch(`presence_${bot.botID}`);
      if (check === 'offline') {
        db.add(`offlinechecks_${bot.botID}`, 1);
      }
    });
  }, 120000000);
  // random bots
  setInterval(async () => {
    var botdata = await botsdata.find();
    if (!botdata) {
      return;
    }

    let randomBots = botdata.filter(a => a.certificate === 'Certified');
    randomBots.forEach((val, key) => {
      randomIndex = Math.ceil(Math.random() * (key + 1));
      randomBots[key] = randomBots[randomIndex];
      randomBots[randomIndex] = val;
    });

    for (let i = 0; i < randomBots.length; i++) {
      if (i === 1) break;
      let labBots = randomBots[i];
      if (labBots) {
        let bot = labBots;
        let b = labBots;
        let website = b.website ? ' | [Website](' + b.website + ')' : '';
        let github = b.github ? ' | [Github](' + b.github + ')' : '';
        let discord = b.support ? ' | [Support Server](' + b.support + ')' : '';
        let coowner;
        if (!b.coowners.length <= 0) {
          coowner = b.coowners.map(a => '<@' + a + '>').join('\n');
        } else {
          coowner = '';
        }
        var checking = db.fetch(`rate_${bot.botID}`);
        if (!checking) {
          var checking = '100';
        }
        var check = db.fetch(`presence_${bot.botID}`);
        if (!check) {
          var check = 'Online';
        }
        const embed = new Discord.MessageEmbed()
          .setTitle(
            'Every 12 Hours Upcoord List Choose an Random Certified Bot to Make It More Famoues'
          )
          .setThumbnail(b.avatar)
          .setAuthor(b.username + '#' + b.discrim, b.avatar)
          .setDescription(
            '**[Vote for the bot named ' +
            b.username +
            '#' +
            b.discrim +
            ' in Upcord Bot List.](https://upcord.xyz/bot/' +
            b.botID +
            '/vote)**'
          )
          .addField('ID', b.botID, true)
          .addField('Username', b.username, true)
          .addField('Discriminator', b.discrim, true)
          .addField('Votes', b.votes, true)
          .addField('Certificate', b.certificate, true)
          .addField('Short Description', b.shortDesc, true)
          .addField('Status', check, true)
          .addField('Uptime', `${checking}%`, true)
          .setColor('#7289da')
          .addField('Server Count', `${b.serverCount || 'N/A'}`, true)
          .addField(
            'Owner(s)',
            `<@${b.ownerID}>\n${coowner.replace('<@>', '')}`,
            true
          )
          .addField(
            'Links',
            `[Invite](https://discord.com/oauth2/authorize?client_id=${
            b.botID
            }&scope=bot&permissions=0)${website}${discord}${github}`,
            true
          );
        client.channels.cache.get('871934909151854683').send(embed);
      }
    }
  }, 4320000);
  setInterval (async () => {
    var botdata = await botsdata.find();
    if (!botdata) {
      return;
    }
    botdata.forEach(bot => {
      var checking = db.fetch(`rate_${bot.botID}`);
      if (checking) {
        var check = db.fetch(`presence_${bot.botID}`);
        db.add(`checks_${bot.botID}`, 1);
        if (check === 'offline') {
          if (checking < 20) {
            let done = db.fetch(`don_${bot.botID}`);
            if (done == 'yes') {
              return;
            }
            let declineembed = new Discord.MessageEmbed()
              .setTitle('Bot Deleted')
              .setDescription(
                `Reason: Bot Uptime was Gone Under 20%\n Moderator: ${
                client.user.username
                }\n Bot: <@${bot.botID}>\n Owner: <@${bot.ownerID}>`
              )
              .setFooter('Embed Logs of Administration');
            client.channels.cache.get('').send(declineembed);
            if (
              client.guilds.cache
                .get(config.server.id)
                .members.fetch(bot.ownerID)
            ) {
              client.users.cache
                .get(bot.ownerID)
                .send(
                  `Your bot named **<@${
                  bot.botID
                  }>** has been deleted.\nReason: **Uptime was gone under 20%**\nAuthorized:*${
                  client.user.username
                  }**`
                );

              botsdata.deleteOne({
                botID: bot.botID,
                ownerID: bot.ownerID,
                botid: bot.botID
              });
              db.set(`don_${bot.botID}`, 'yes');
            }
            let guild = client.guilds.cache.get(config.server.id);
            var bot1 = guild.member(bot.botID);
            bot1.kick();
          }
          db.add(`offlinechecks_${bot.botID}`, 10);

          db.set(`rate_${bot.botID}`, checking - 10);
        }
      }
    });
  }, 36000000);
  console.log(

    '[upcordlist]: Bot successfully connected as ' + client.user.tag + '.'

  );
  let botsSchema = require('./src/database/models/botlist/bots.js');
  const bots = await botsSchema.find();
  client.user.setPresence({
    activity: {
      type: 'WATCHING',
      name: 'upcord.xyz | ' + bots.length + ' bots'
    },
    status: 'idle'
  });
});

/*=======================================================================================*/
client.on('guildMemberAdd', async member => {
  let guild = client.guilds.cache.get(config.server.id);
  if (member.user.bot) {
    try {
      guild.member(member.id).roles.add(config.server.roles.botlist.bot);
    } catch (error) { }
  }
});
/*=======================================================================================*/

/*
    SERVER LIST CLIENT 
*/
const serverClient = new Client();
serverClient.login(config.bot.servers.token);
global.clientSL = serverClient;
require('./src/servers/client.js');

/*=======================================================================================*/
require('./src/server.js')(client);
require('./src/database/connect.js')(client);

client.login(config.bot.token);

/*=======================================================================================*/
let voiceStates = {}

client.on('voiceStateUpdate', async(oldState, newState) => {
  var { id } = oldState // This is the user's ID
  if (!oldState.channel) {
    console.log("A user connected.");
    // The user has joined a voice channel
    voiceStates[id] = new Date()
  } else if (!newState.channel) {
    console.log("A user disconnected.");
    var now = new Date()
    var joined = voiceStates[id] || new Date()
    var rewards = Math.floor(Math.random() * 5) + 1;
    // This will be the difference in milliseconds
    var dateDiff = now.getTime() - joined.getTime()
    if (dateDiff >= 60000) {
      console.log(`Giving some coins to ${newState.member.id} as he is in more that 1 min in vc`)
      var randomNumber = Math.floor(Math.random() * 3) + 1;
      var find = await profiledata.findOne({ userID: newState.member.id })
      if (!find || !find.userID){
        await new profiledata({
           userID: newState.member.id, 
           coins: '0'
      })
      }
      let mycoins = find ? find.coins : null;
      if (mycoins) {
      await profiledata.findOneAndUpdate({
        userID: newState.member.id
    }, {
        $set: {
            coins: parseInt(mycoins)+5
        }
    }, function(err, docs) {})}
    if (!mycoins) {
      await profiledata.findOneAndUpdate({
        userID: newState.member.id
    }, {
        $set: {
            coins: 5
        }
    }, function(err, docs) {})}
    client.channels.cache.get('877448118956855316').send(new Discord.MessageEmbed().setTitle(`Upcord Shards`).setDescription(`Hey <@${newState.member.id}>, You have gained some **Upcord Shards** for being active!\n<:members:876940862305751121> View your [profile](https://upcord.xyz/user/${newState.member.id})`).setFooter(`Our coins system is still in beta, so sometimes it might work...`))
     client.channels.cache.get('877448118956855316').send(`<@${newState.member.id}>`)
    }
  }
})


/*=======================================================================================*/
/* RESET DATA'S EVERY MONTHS */

// BOT/SERVER VOTES & ANALYTICS
const { CronJob } = require('cron');
const botlar = require('./src/database/models/botlist/bots.js');
const servers = require('./src/database/models/servers/server.js');
client.on('ready', async () => {
  var resetStats = new CronJob(
    '00 00 1 * *',
    async function() {
      let x = await botlar.find();
      await x.forEach(async a => {
        await botlar.findOneAndUpdate(
          {
            botID: a.botID
          },
          {
            $set: {
              votes: 0,
              analytics_invites: 0,
              analytics_visitors: 0,
              country: {},
              analytics: {}
            }
          }
        );
      });
      let sunucular = await servers.find();
      await sunucular.forEach(async a => {
        await servers.findOneAndUpdate(
          {
            id: a.id
          },
          {
            $set: {
              votes: 0,
              bumps: 0,
              analytics_joins: 0,
              analytics_visitors: 0,
              country: {},
              analytics: {}
            }
          }
        );
      });
    },
    null,
    true,
    'Europe/Istanbul'
  );
  resetStats.start();
});


/**
 
const customStatus = member.presence.activites
  .find(activity => activity.type === 'CUSTOM_STATUS')
  ?.state
const inviteLink = 'https://discord.gg/HdEmqqhw2j'

if (customStatus) {
  
   * Whether `customStatus` has the invite link `inviteLink`.
   * @type {boolean}
   
  const hasInviteLink = customStatus.includes(inviteLink)
}
if (hasInviteLink) {
  member.roles.add("871963354607005706")
    // Don't forget to handle errors!
    .catch(console.error)
}
const roleID = "871963354607005706"


client.on('presenceUpdate', (_oldPresence, newPresence) => {
  const member = newPresence.member
  if (member) {
    // Ignore members who already have the role
    if (!member.roles.cache.has(roleID)) {
      const customStatus = newPresence.activites
        .find(activity => activity.type === 'CUSTOM_STATUS')
        ?.state
      if (customStatus) {
        if (customStatus.includes(inviteLink)) {
          member.roles.add(roleID)
            .catch(console.error)
        }
      }
    }
  }
})**/

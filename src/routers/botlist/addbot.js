const app = require('express').Router();
const botsdata = require("../../database/models/botlist/bots.js");
const client = global.Client;
const { channels } = global.config.server;
const discord = require("discord.js")
console.log("[vcodes.xyz]: Botlist/Add Bot router loaded.");

    app.get("/addbot", global.checkAuth, async (req,res) => {
      if(!client.guilds.cache.get(config.server.id).members.cache.get(req.user.id)) return res.redirect("/error?code=403&message=To do this, you have to join our discord server.");
        res.render("botlist/addbot.ejs", {
	        bot: global.Client,
	        path: req.path,
	        config: global.config,
	        user: req.isAuthenticated() ? req.user : null,
	        req: req,
	        roles:global.config.server.roles,
	        channels: global.config.server.channels
    	})
    })

    app.post("/addbot", global.checkAuth, async (req,res) => {
      let rBody = req.body;
      let botvarmi = await botsdata.findOne({botID: rBody['botID']});
      if(botvarmi) return res.redirect('/error?code=404&message=The bot you are trying to add exists in the system.');

      client.users.fetch(req.body.botID).then(async a => {
      if(!a.bot) return res.redirect("/error?code=404&message=You entered an invalid bot id.");
      if(!a) return res.redirect("/error?code=404&message=You entered an invalid bot id.");
      if(rBody['coowners']) {
          if(String(rBody['coowners']).split(',').length > 3) return res.redirect("?error=true&message=You can add up to 3 CO-Owners..")
          if(String(rBody['coowners']).split(',').includes(req.user.id)) return res.redirect("?error=true&message=You cannot add yourself to other CO-Owners.");
      }
      await new botsdata({
           botID: rBody['botID'], 
           ownerID: req.user.id,
           ownerName: req.user.usename,
           username: a.username,
           discrim: a.discriminator,
           avatar: a.avatarURL(),
           prefix: rBody['prefix'],
           invite: rBody['invite'],
           longDesc: rBody['longDesc'],
           shortDesc: rBody['shortDesc'],
           status: "UnApproved",
           tags: rBody['tags'],
           certificate: "None",
           token: makeToken(128),
      }).save()
      if(rBody['background']) {
          await botsdata.findOneAndUpdate({botID: rBody['botID']},{$set: {backURL: rBody['background']}}, function (err,docs) {})
      }
      if(rBody['github']) {
          await botsdata.findOneAndUpdate({botID: rBody['botID']},{$set: {github: rBody['github']}}, function (err,docs) {})
      }
      if(rBody['website']) {
          await botsdata.findOneAndUpdate({botID: rBody['botID']},{$set: {website: rBody['website']}}, function (err,docs) {})
      }
      if(rBody['support']) {
          await botsdata.findOneAndUpdate({botID: rBody['botID']},{$set: {support: rBody['support']}}, function (err,docs) {})
      }
      if(rBody['coowners']) {
          if(String(rBody['coowners']).split(',').length > 3) return res.redirect("?error=true&message=You can add up to 3 CO-Owners..")
          if(String(rBody['coowners']).split(',').includes(req.user.id)) return res.redirect("?error=true&message=You cannot add yourself to other CO-Owners.");
          await botsdata.findOneAndUpdate({botID: rBody['botID']},{$set: { coowners: String(rBody['coowners']).split(',') }}, function (err,docs) {})
      }
      })
      client.users.fetch(rBody['botID']).then(a => {
    client.channels.cache.get(channels.botlog).send(new discord.MessageEmbed()
    .setTitle(`<:plus:870019597791805521> **${req.user.username}** added **${a.tag}**`)
    .setDescription(`[Click Here](https://upcord.xyz/bot/${a.id})`)
    .setTimestamp()
    .setColor("GREEN")
    .setFooter(`Added By - ${req.user.username}`))
    
      client.channels.cache.get(channels.botlog).send("<@&847365325594820618>");
      res.redirect(`?success=true&message=Your bot has been successfully added to the system.&botID=${rBody['botID']}`)
      })
    })

module.exports = app;

function makeToken(length) {
    var result = '';
    var characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
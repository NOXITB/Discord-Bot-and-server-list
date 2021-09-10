const app = require('express').Router();
const path = require("path");
const datum = new Date().toLocaleString();
const channels = global.config.server.channels,
      roles = global.config.server.roles;

console.log("[vcodes.xyz]: Admin/Partner router loaded.");
function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function createID(length) {
  var result = "";
  var characters = "123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function makeidd(length) {
  var result = "";
  var characters =
    "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function makeToken(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function getuser(id) {
  try {
    return client.users.fetch(id);
  } catch (error) {
    return undefined;
  }
}
app.get("/admin/news", global.checkAuth, async (req, res) => {
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    const Database = require("void.db");
    const db = new Database(path.join(__dirname, '../database/json/news.json'));
	res.render("admin/administrator/news.ejs", {
	    bot: global.Client,
	    path: req.path,
	    config: global.config,
	    user: req.isAuthenticated() ? req.user : null,
	    req: req,
	    roles:global.config.server.roles,
	    channels: global.config.server.channels,
	    db: db
	 })
});
app.post("/admin/news", global.checkAuth, async (req, res) => {
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    const Database = require("void.db");
    const db = new Database(path.join(__dirname, '../database/json/news.json'));
    db.push(`news`, {
        code: createID(12),
        icon: req.body.icon,
        banner: req.body.banner,
        ownerID: req.body.ownerID,
        serverName: req.body.serverName,
        date: datum,
        description: req.body.partnerDesc
    })
    const webhook = require("webhook-discord");


      const Hook = new webhook.Webhook(
      
    
        "https://discord.com/api/webhooks/874475776878211142/m06v9iyY7RXceOVivPpdzX3X31M8HF1O-YU6iNVKPV7xOL9rt1fMDK_liFLJe8jaCJQv"
      );
      const msg = new webhook.MessageBuilder()
        .setName("Upcord News")
        .setAvatar(req.body.icon)
        .setTitle(req.body.serverName)
        .setDescription(
          `<@${req.body.ownerID}> posted a news message\n\nLink:\n[website](https://upcordlist.noxitb.repl.co/news)`
        )
        .setFooter(`Copyright © Upcord official 2021`);
      Hook.send(msg);

      return res.redirect("/admin/news?success=true&message=News added.");
    
});


  

module.exports = app;
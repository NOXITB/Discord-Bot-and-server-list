const app = require('express').Router();
const path = require("path");
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

app.get("/admin/partners", global.checkAuth, async (req, res) => {
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    const Database = require("void.db");
    const db = new Database(path.join(__dirname, '../../../database/json/partners.json'));
	res.render("admin/administrator/partners.ejs", {
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
app.post("/admin/partners", global.checkAuth, async (req, res) => {
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    const Database = require("void.db");
    const db = new Database(path.join(__dirname, '../database/json/partners.json'));
    db.push(`partners`, {
        code: createID(36),
        icon: req.body.icon,
        ownerID: req.body.ownerID,
        serverName: req.body.serverName,
        website: req.body.Website,
        description: req.body.partnerDesc
    })
    let x = client.guilds.cache.get(config.server.id).members.cache.get(req.body.ownerID)
    if (x) {
        x.roles.add(roles.profile.partnerRole)
    }
    return res.redirect('/admin/partners?success=true&message=Partner added.')
});

module.exports = app;
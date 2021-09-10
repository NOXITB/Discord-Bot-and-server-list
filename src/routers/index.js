const app = require('express').Router();
const botsdata = require("../database/models/botlist/bots.js");
const profiledata = require("../database/models/profile.js");
console.log("[vcodes.xyz]: Index router loaded.");

app.get("/", async (req,res) => {
    if (req.isAuthenticated()) {
      var prodata = await profiledata.findOne({
            userID: req.user.id
        });
    }
    res.render("index.ejs", {
    	bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        botdata: await botsdata.find(),
        prodata: prodata,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

module.exports = app;
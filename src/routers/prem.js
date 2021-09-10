const app = require('express').Router();
const botsdata = require("../database/models/botlist/bots.js");

console.log("[vcodes.xyz]: Index router loaded.");

app.get("/premium", async (req,res) => {
    res.render("prem.ejs", {
    	bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        botdata: await botsdata.find(),
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

module.exports = app;
const app = require('express').Router();
const botsdata = require("../database/models/botlist/bots.js");

console.log("[vcodes.xyz]: Terms router loaded.");

app.get("/privacy", async (req,res) => {
    res.render("priv.ejs", {
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
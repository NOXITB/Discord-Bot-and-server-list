const app = require('express').Router();
const botsdata = require("../database/models/botlist/bots.js");

console.log("[vcodes.xyz]: Terms router loaded.");

app.get("/zohoverify/verifyforzoho.html", async (req,res) => {
    res.render("zohoverify/verifyforzoho.html", {
    	bot: global.Client,
        path: req.path,
        req: req,
    })
})

module.exports = app;
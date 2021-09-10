const app = require('express').Router();
const Database = require("void.db");
const path = require("path")
const db = new Database(path.join(__dirname, '../database/json/news.json'));

console.log("[vcodes.xyz]: News router loaded.");

app.get("/news", async (req,res) => {
    res.render("news.ejs", {
    	bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        db: db,
        roles: global.config.server.roles
    })
})

module.exports = app;
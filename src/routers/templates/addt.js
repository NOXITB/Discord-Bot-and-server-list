const app = require('express').Router();
const db = require("../../database/models/templates/template.js");
const client = global.clientSL;
const channels = global.config.server.channels;

console.log("[vcodes.xyz/servers]: Add Server router loaded.");

app.get("/addtemp", global.checkAuth, async (req,res) => {
  if(!client.guilds.cache.get(config.server.id).members.cache.get(req.user.id)) return res.redirect("/error?code=403&message=To do this, you have to join our discord server.");
    res.render("templates/add.ejs", {
        bot: global.clientSL,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
	})
})
app.post("/addtemp", global.checkAuth, async (req,res) => {
    let { templateID, link, shortDesc, longDesc, tags } = req.body;
    let checkGuild = await db.findOne({ id: templateID });
    if(checkGuild) return res.send({ error: true, message: "This server already exist system." });
    if(!templateID || !longDesc || !shortDesc || !tags) return res.send({ error: true, message: "Fill the must any blanks."});
    if(!link) return res.send({ error: true, message: "Fill the must any blanks."});
    

    await db.updateOne({
            id: guildID
    }, {
        $set:
            {
                name: guild.name,
                icon: guild.iconURL({ dynamic: true }),
                ownerID: guild.owner.id ? guild.owner.id : req.user.id,
                longDesc: req.body.longDesc,
                shortDesc: req.body.shortDesc,
                tags: req.body.tags,
                votes: 0
            }
    }, { upsert: true })
    await db.updateOne({
        id: req.params.templateID
    }, {
        $set: {
            link: req.body.link
        }
    }, { upsert: true })
    
    return res.send({ success: true, message: "template succesfuly added." });
})

module.exports = app;

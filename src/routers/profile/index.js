const app = require('express').Router();
const botsdata = require("../../database/models/botlist/bots.js");
const servers = require("../../database/models/servers/server.js");
const client = global.Client;

console.log("[vcodes.xyz]: Profile/Index router loaded.");

const profiledata = require("../../database/models/profile.js");
const banSchema = require("../../database/models/site-ban.js");
app.get("/:userID", async (req, res) => {
    client.users.fetch(req.params.userID).then(async a => {
        const pdata = await profiledata.findOne({
            userID: a.id,
            
        });
    
        const botdata = await botsdata.find()
        let banVerisi = await banSchema.findOne({user: req.params.userID });
        const serverData = await servers.find()
        res.render("profile/profile.ejs", {
            bot: global.Client,
            path: req.path,
            config: global.config,
            user: req.isAuthenticated() ? req.user : null,
            req: req,
            botdata: await botsdata.find(),
            roles:global.config.server.roles,
            channels: global.config.server.channels,
            pdata: pdata,
            botdata: botdata,
            member: a,
            serverData: serverData,
            bannedCheck: banVerisi
        })
    });
});
app.get("/@/:userID", async (req,res) => {
    //console.log("Widget");
    const { Canvas, resolveImage } = require("canvas-constructor");

    client.users.fetch(req.params.userID).then(async a => {
        const pdata = await profiledata.findOne({
            userID: a.id,
            
        });
    if(!pdata) return res.json({ error: true, message: "This bot id not a function", errorcode: 404});
    res.header("Content-Type",'application/json');
    
    try {
    

   let geting = client.users.cache.get(req.params.userID);
    var forav = geting.displayAvatarURL();
    var forav = forav.replace(".webp", ".png")
   let avatar = await resolveImage(forav);
 const imagem = await resolveImage('https://media.discordapp.net/attachments/878158835049717780/878168259311067147/UPCORD.XYZ.png');

    let img = new Canvas(500, 250)
      .printImage(imagem, 0, 0, 500, 250)
      .setColor("#141517")
      //.printRectangle(0, 0, 500, 250)
      .setColor("#FFFFFF")
      .setTextFont('bold 35px Verdana')
      .printText(pdata.username, 120, 75)
      .printRoundedImage(avatar, 30, 30, 70, 70, 20)
      .setTextAlign("left")
      .setTextFont('bold 12px Verdana') //Verdana
     
      
    
    
    img
      .setTextFont('normal 15px Verdana') //Verdana
      .printWrappedText(pdata.biography, 30, 175, 440, 15)
      .setTextFont('bold 12px Verdana')
      .printRectangle(15, 245)
      //.printText(bots.ownerName, 10, 245)
      //.setTextAlign("right")
      //.printText("dbots.ml", 490, 245)
      //.printRoundedImage(avatar2, 490, 245)

    res.writeHead(200, {
      "Content-Type": "image/png"
    });
    res.end(await img.toBuffer(), "binary");
  } catch (e) {
    throw e
    res.sendStatus(500);
  }
  })
})

module.exports = app;
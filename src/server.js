
  const url = require("url");
  const path = require("path");
  const datum = new Date().toLocaleString();
  const express = require("express");
  const passport = require("passport");
  const session = require("express-session");
  const Strategy = require("passport-discord").Strategy;
  const ejs = require("ejs");
  const bodyParser = require("body-parser");
  const Discord = require("discord.js");
  const config = require("../config.js");
  const channels = config.server.channels;
  const app = express();
  const { Canvas, resolveImage } = require("canvas-constructor");
  const MemoryStore = require("memorystore")(session);
  const fetch = require("node-fetch");
  const cookieParser = require('cookie-parser');
  const referrerPolicy = require('referrer-policy');
  app.use(referrerPolicy({ policy: "strict-origin" }))
  const rateLimit = require("express-rate-limit");
  var MongoStore = require('rate-limit-mongo');
  const serversdata = require("./database/models/servers/server.js");
  const botsdata = require("./database/models/botlist/bots.js");
  const roles = config.server.roles;
  const vanitysdata = require("./database/models/vanity/vanity.js");
const moment = require("moment")

const { createCanvas, loadImage, registerFont } = require('canvas');
const db = require("quick.db");
const ms = require("parse-ms");
// MODELS
const appsdata = require("./database/models/botlist/certificate-apps.js");
const marked = require("markdown-converter");
const profiledata = require("./database/models/profile.js");
const voteSchema = require("./database/models/botlist/vote.js");
const uptimeSchema = require("./database/models/uptime.js");


const codesSchema = require("./database/models/codes.js");
  

  // MODELS
  const banSchema = require("./database/models/site-ban.js");
  const checkOwner = async (req, res, next) => {
    if (req.isAuthenticated()) {
      if (
        client.guilds.cache
          .get(config.server.id)
          .members.cache.get(req.user.id)
          .roles.cache.get(roles.yonetici)
      ) {
        next();
      } else {
        res.redirect(
          "/error?code=403&message=You is not competent to do this."
        );
      }
    } else {
      req.session.backURL = req.url;
      res.redirect("/login");
    }
  };

  module.exports = async (client) => {

    const apiLimiter = rateLimit({
      store: new MongoStore({
         uri: global.config.bot.mongourl,
         collectionName: "rate-limit",
         expireTimeMs:  60 * 60 * 1000,
         resetExpireDateOnChange: true
         }),
           windowMs: 60 * 60 * 1000,
           max: 4,
           message:
       ({ error: true, message:  "Too many requests, you have been rate limited. Please try again in one hour." })
    });

    var minifyHTML = require('express-minify-html-terser');
    app.use(minifyHTML({
        override:      true,
        exception_url: false,
        htmlMinifier: {
            removeComments:            true,
            collapseWhitespace:        true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes:     true,
            removeEmptyAttributes:     true,
            minifyJS:                  true
        }
    }));

    app.set('views', path.join(__dirname, '/views'));
    const templateDir = path.resolve(`${process.cwd()}${path.sep}src/views`);
    app.use("/css", express.static(path.resolve(`${templateDir}${path.sep}assets/css`)));
    app.use("/js", express.static(path.resolve(`${templateDir}${path.sep}assets/js`)));
    app.use("/img", express.static(path.resolve(`${templateDir}${path.sep}assets/img`)));
  
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));
  
    passport.use(new Strategy({
      clientID: config.website.clientID,
      clientSecret: config.website.secret,
      callbackURL: config.website.callback,      
      scope: ["identify", "guilds", "guilds.join"]
    },
    (accessToken, refreshToken, profile, done) => { 
      process.nextTick(() => done(null, profile));
    }));
  
    app.use(session({
      store: new MemoryStore({ checkPeriod: 86400000 }),
      secret: "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
      resave: false,
      saveUninitialized: false,
    }));
  
    app.use(passport.initialize());
    app.use(passport.session());
  
  
    app.engine("upcord", ejs.renderFile);
    app.set("view engine", "upcord");
  
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
  
    global.checkAuth = (req, res, next) => {
      if (req.isAuthenticated()) return next();
      req.session.backURL = req.url;
      res.redirect("/login");
    }
   app.get("/login", (req, res, next) => {
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL; 
      } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = "/";
       }
      next();
    },
    passport.authenticate("discord", { prompt: 'none' }));
    app.get("/callback", passport.authenticate("discord", { failureRedirect: "/error?code=999&message=We encountered an error while connecting." }), async (req, res) => {
        let banned = await banSchema.findOne({user: req.user.id})
        if(banned) {
        client.users.fetch(req.user.id).then(async a => {
        (new Discord.MessageEmbed().setAuthor(a.username, a.avatarURL({dynamic: true})).setThumbnail(a.avatarURL({dynamic: true})).setColor("RED").setDescription(`The user named [**${a.username}**#${a.discriminator}](https://upcordlist.noxitb.repl.co/user/${a.id}) tried to log in, but could not log in because thay was blocked from the site.`).addField("Username", a.username).addField("User ID", a.id).addField("User Discriminator", a.discriminator))
        })
    
        req.session.destroy(() => {
        res.json({ login: false, message: "You have been blocked from upcord.", logout: true })
        req.logout();
        });
        } else {
            try {
              const request = require('request');
              request({
                  url: `https://discordapp.com/api/v8/guilds/${config.server.id}/members/${req.user.id}`,
                  method: "PUT",
                  json: { access_token: req.user.accessToken },
                  headers: { "Authorization": `Bot ${client.token}` }
              });
        } catch {};
        res.redirect(req.session.backURL || '/')
        client.users.fetch(req.user.id).then(async a => {
        client.channels.cache.get(channels.login).send(new Discord.MessageEmbed().setAuthor(a.username, a.avatarURL({dynamic: true})).setThumbnail(a.avatarURL({dynamic: true})).setColor("GREEN").setDescription(`user named [**${a.username}**#${a.discriminator}](https://upcordlist.noxitb.repl.co/user/${a.id}) has logged in to the site.`).addField("Username", a.username).addField("User ID", a.id).addField("User Discriminator", a.discriminator))
        
        })
        }
    });
    app.get("/logout", function (req, res) {
      req.session.destroy(() => {
        req.logout();
        res.redirect("/");
      });
    });
      const renderTemplate = (res, req, template, data = {}) => {
        const baseData = {
            bot: client,
            path: req.path,
            _token: req.session['_token'],
            user: req.isAuthenticated() ? req.user : null
        };
        res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
    };

    app.get("/team", (req, res) => {
        const Database = require("void.db");
        renderTemplate(res, req, "/botlist/team.ejs", {
            roles,
            config,
            req: req    
        });
    });
    app.get("/server/:botID/vote", async (req, res) => {
    let botdata = await serversdata.findOne({ serverID: req.params.botID });
    if (!botdata)
      return res.redirect(
        "/error?code=404&message=You entered an invalid server id."
      );
    if (req.user) {
      if (!req.user.id === botdata.ownerID) {
        if (botdata.status != "Approved")
          return res.redirect(
            "/error?code=404&message=You entered an invalid server id."
          );
      }
    }
    renderTemplate(res, req, "servers/vote.ejs", {
      req,
      roles,
      config,
      botdata
    });
  });

  app.post(
    "/server/:botID/vote",
    checkAuth,
    async (req, res) => {
      const votes = require("./database/models/servers/vote.js");
      let botdata = await serversdata.findOne({ serverID: req.params.botID });
      let x = await votes.findOne({
        user: req.user.id,
        server: req.params.botID
      });

      if (x) {
        var timeleft = await parseMilliseconds(x.ms - (Date.now() - x.Date));
        var hour = timeleft.hours;
        var minutes = timeleft.minutes;
        var seconds = timeleft.seconds;
        return res.redirect(
          `/error?code=400&message=You can vote in ${hour}h ${minutes}m.`
        );
      }
      await votes.findOneAndUpdate(
        { server: req.params.botID, user: req.user.id },
        { $set: { Date: Date.now(), ms: 43200000 } },
        { upsert: true }
      );
      await serversdata.findOneAndUpdate(
        { serverID: req.params.botID },
        { $inc: { votes: 1 } }
      );
      let approveembed3 = new Discord.MessageEmbed()
        .setTitle("Server Voted")
        .setDescription(
          `Server: ${botdata.username}\n Voter: <@${
            req.user.username
          }> Votes: ${botdata.votes + 1}`
        )
        .setFooter("Embed Logs of Administration");
      client.channels.cache.get(channels.votes).send(approveembed3);
      return res.redirect(
        `/server/${req.params.botID}/vote?success=true&message=You voted successfully. You can vote again after 12 hours.`
      );

      if (botdata.dcwebhook) {
        const webhook = require("webhook-discord");

        const Hook = new webhook.Webhook(botdata.dcwebhook);
        const msg = new webhook.MessageBuilder()
          .setName("Dumb bot list Discord Webhooks")
          .setAvatar(
            "https://cdn.discordapp.com/avatars/849617280245432340/3b11b85c7054df0bcb444ed8480d3dbf.webp?size=4096"
          )
          .setTitle(`${votedbot.username} Has just been Voted!!`)
          .setDescription(
            `Voter: ${req.user.username} Bot: ${
              botdata.username
            } Total Votes: ${botdata.votes + 1}`
          )
          .setFooter(`Discord Default Webhook`);
        Hook.send(msg);
      }
      if (botdata.webhook) {
        const fetch = require("node-fetch");
        fetch(botdata.webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user: `${req.user.username}`,
            bot: `${botdata.username}`,
            votes: `${botdata.votes + 1}`
          })
        });
      }
      renderTemplate(res, req, "servers/vote.ejs", {
        req,
        roles,
        config,
        botdata,
        db
      });
    }
  );
 

  
    app.use(async (req, res, next) => {
        var getIP = require('ipware')().get_ip;
        var ipInfo = getIP(req);
        var geoip = require('geoip-lite');
        var ip = ipInfo.clientIp;
        var geo = geoip.lookup(ip);
        
        if(geo) {
          let sitedatas = require("./database/models/analytics-site.js")
          await sitedatas.updateOne({ id: config.website.clientID }, {$inc: {[`country.${geo.country}`]: 1} }, { upsert: true})
        }
        return next();
    })
    const http = require('http').createServer(app);
    const io = require('socket.io')(http);
    io.on('connection', socket => {
        io.emit("userCount", io.engine.clientsCount);
    });
    http.listen(5000, () => { console.log("[upcord]: Website running on 3000 port.")});

    //------------------- Routers -------------------//

    const checkAdmin = async (req, res, next) => {
  if (req.isAuthenticated()) {
    if (client.guilds.cache.get(config.server.id).members.cache.get(req.user.id).roles.cache.get(roles.yonetici) || client.guilds.cache.get(config.server.id).members.cache.get(req.user.id).roles.cache.get(roles.moderator)) {
      next();
    } else {
      res.redirect("/error?code=403&message=You is not competent to do this.")
    }
  } else {
    req.session.backURL = req.url;
    res.redirect("/login");
  }
}

app.get("/admin/premium/give/:botID", checkAdmin, checkAuth, async (req, res) => {
  await serversdata.findOneAndUpdate({
    id: req.params.botID
  }, {
      $set: {
        premium: "Premium",
      }
    }, function(err, docs) { })
  let serverdata = await serversdata.findOne({
    id: req.params.botID
  });

  client.guilds.fetch(serverdata.id).then(bota => {
    client.channels.cache.get(config.server.channels.botlog).send(`<:check:853262343949254696> <@${serverdata.ownerID}>'s server **${bota.name}** has been promoted to **Premium**.`)
    client.users.cache.get(serverdata.ownerID).send(`<:check:853262343949254696> Your server named **${bota.name}** has been promoted to **Premium**.`)
  });
  let guild = client.guilds.cache.get(config.server.id)
  guild.members.cache.get(serverdata.ownerID).roles.add(roles.botlist.premium_developer);
  return res.redirect(`/admin/premium-servers?success=true&message=Promotion gived.&id=${req.params.botID}`)
});
app.get("/admin/premium/delete/:botID",  checkAdmin, checkAuth, async (req, res) => {
  let rBody = req.body;
  await serversdata.findOneAndUpdate({
    id: req.params.botID
  }, {
      $set: {
        premium: "None",
      }
    }, function(err, docs) { })
  let serverdata = await serversdata.findOne({
    id: req.params.botID
  });
  client.guilds.fetch(serverdata.id).then(bota => {
    client.channels.cache.get(config.server.channels.botlog).send(`<:notcheck:853262343790526495> <@${serverdata.ownerID}>'s server named **${bota.name}**'s Premium has been removed.`)
    client.users.cache.get(serverdata.ownerID).send(`<:notcheck:853262343790526495> Your server named **${bota.name}**'s Premium has been removed.`)
  });
  await appsdata.deleteOne({
    id: req.params.botID
  })
  let guild = client.guilds.cache.get(config.server.id)
  guild.members.cache.get(serverdata.ownerID).roles.remove(roles.botlist.premium_developer);
  return res.redirect(`/admin/premium-servers?success=true&message=Promotion deleted.`)
});
app.get("/admin/boost/delete/:botID", checkAdmin, checkAuth, async (req, res) => {
  let rBody = req.body;
  await botsdata.findOneAndUpdate({
    botID: req.params.botID
  }, {
      $set: {
        boosted: "None",
      }
    }, function(err, docs) { })
  let botdata = await botsdata.findOne({
    botID: req.params.botID
  });
  client.users.fetch(botdata.botID).then(bota => {
    client.channels.cache.get(channels.botlog).send(`<:notcheck:853262343790526495> <@${botdata.ownerID}>'s bot named **${bota.tag}**'s promotion has been removed.`)
    client.users.cache.get(botdata.ownerID).send(`<:notcheck:853262343790526495> Your bot named **${bota.tag}**'s boost has been removed.`)
  });
  await appsdata.deleteOne({
    botID: req.params.botID
  })
  let guild = client.guilds.cache.get(config.server.id)
  guild.members.cache.get(botdata.botID).roles.remove(roles.botlist.boosted_bot);
  guild.members.cache.get(botdata.ownerID).roles.remove(roles.botlist.boosted_developer);
  return res.redirect(`/admin/certificate-apps?success=true&message=Certificate deleted.`)
});
app.get("/promotion",  (req, res) => {
  renderTemplate(res, req, "/botlist/promotion.ejs", {
    config,
    req,
    roles
  });
});

app.get("/admin/approvedservers",  checkAdmin, checkAuth, async (req, res) => {
  const serverdata = await serversdata.find()
  renderTemplate(res, req, "admin/serverapproved.ejs", {
    req,
    roles,
    config,
    serverdata
  })
});
app.get("/admin/server/delete/:botID", checkAdmin, checkAuth, async (req, res) => {
  let botdata = await serversdata.findOne({ id: req.params.botID })
  if (!botdata) return res.redirect("/error?code=404&message=You entered an invalid server id.");
  let guild = client.guilds.cache.get(config.server.id)
  await botdata.deleteOne({ id: req.params.guildID });
  client.channels.cache.get(channels.botlog).send(`<:Decline:853262344876851211> <@${botdata.ownerID}>'s server named **${botdata.name}** has been deleted by ${req.user.username}.`)
  guild.members.cache.get(botdata.ownerID).roles.remove(roles.botlist.ownerserver);
  if (botdata.coowners) {
    botdata.coowners.map(a => {
      guild.members.cache.get(a).roles.remove(roles.botlist.ownerserver);
    })
  }
  return res.redirect(`/admin/approvedservers?success=true&message=Server deleted.`)
});
app.get("/admin/promote/delete/:botID",  checkAdmin, checkAuth, async (req, res) => {
  let rBody = req.body;
  await botsdata.findOneAndUpdate({
    botID: req.params.botID
  }, {
      $set: {
        promoted: "None",
      }
    }, function(err, docs) { })
  let botdata = await botsdata.findOne({
    botID: req.params.botID
  });
  client.users.fetch(botdata.botID).then(bota => {
    client.channels.cache.get(channels.botlog).send(`<:notcheck:853262343790526495> <@${botdata.ownerID}>'s bot named **${bota.tag}**'s promotion has been removed.`)
    client.users.cache.get(botdata.ownerID).send(`<:notcheck:853262343790526495> Your bot named **${bota.tag}**'s promotion has been removed.`)
  });
  await appsdata.deleteOne({
    botID: req.params.botID
  })
  let guild = client.guilds.cache.get(config.server.id)
  guild.members.cache.get(botdata.botID).roles.remove(roles.botlist.promoted_bot);
  guild.members.cache.get(botdata.ownerID).roles.remove(roles.botlist.promoted_developer);
  return res.redirect(`/admin/promoted-bots?success=true&message=Promotion deleted.`)
});
app.get("/admin/boost-bots",  checkAdmin, checkAuth, async (req, res) => {
  const botdata = await botsdata.find();
  renderTemplate(res, req, "admin/boosted-bots.ejs", {
    req,
    roles,
    config,
    botdata
  })
});
app.get("/admin/promote-bots", checkAdmin, checkAuth, async (req, res) => {
  const botdata = await botsdata.find();
  renderTemplate(res, req, "admin/promoted-bots.ejs", {
    req,
    roles,
    config,
    botdata
  })
});
app.get("/admin/boost-bots", checkAdmin, checkAuth, async (req, res) => {
  const botdata = await botsdata.find();
  renderTemplate(res, req, "admin/boosted-bots.ejs", {
    req,
    roles,
    config,
    botdata
  })
});
app.get("/admin/promote-bots",  checkAdmin, checkAuth, async (req, res) => {
  const botdata = await botsdata.find();
  renderTemplate(res, req, "admin/promoted-bots.ejs", {
    req,
    roles,
    config,
    botdata
  })
});
app.get("/admin/boost/give/:botID",checkAdmin, checkAuth, async (req, res) => {
  await botsdata.findOneAndUpdate({
    botID: req.params.botID
  }, {
      $set: {
        boosted: "true",
      }
    }, function(err, docs) { })
  let botdata = await botsdata.findOne({
    botID: req.params.botID
  });

  client.users.fetch(botdata.botID).then(bota => {
    client.channels.cache.get(channels.botlog).send(`<:check:853262343949254696> <@${botdata.ownerID}>'s bot  **${bota.tag}** has been **Boosted**.`)
    client.users.cache.get(botdata.ownerID).send(`<:check:853262343949254696> Your bot named **${bota.tag}** has been **Boosted**.`)
  });
  let guild = client.guilds.cache.get(config.server.id)
  guild.members.cache.get(botdata.botID).roles.add(roles.botlist.boosted_bot);
  guild.members.cache.get(botdata.ownerID).roles.add(roles.botlist.boosted_developer);
  if (botdata.coowners) {
    botdata.coowners.map(a => {
      if (guild.members.cache.get(a)) {
        guild.members.cache.get(a).roles.add(roles.botlist.boosted_developer);
      }
    })
  }
  return res.redirect(`/admin/boost-apps?success=true&message=Promotion gived.&botID=${req.params.botID}`)
});
app.get("/admin/promote/give/:botID",  checkAdmin, checkAuth, async (req, res) => {
  await botsdata.findOneAndUpdate({
    botID: req.params.botID
  }, {
      $set: {
        promoted: "Promoted",
      }
    }, function(err, docs) { })
  let botdata = await botsdata.findOne({
    botID: req.params.botID
  });

  client.users.fetch(botdata.botID).then(bota => {
    client.channels.cache.get(channels.botlog).send(`<:check:853262343949254696> <@${botdata.ownerID}>'s bot  **${bota.tag}** has been **Promoted**.`)
    client.users.cache.get(botdata.ownerID).send(`<:check:853262343949254696> Your bot named **${bota.tag}** has been **Promoted**.`)
  });
  let guild = client.guilds.cache.get(config.server.id)
  guild.members.cache.get(botdata.botID).roles.add(roles.botlist.promoted_bot);
  guild.members.cache.get(botdata.ownerID).roles.add(roles.botlist.promoted_developer);
  if (botdata.coowners) {
    botdata.coowners.map(a => {
      if (guild.members.cache.get(a)) {
        guild.members.cache.get(a).roles.add(roles.botlist.promoted_developer);
      }
    })
  }
  return res.redirect(`/admin/promote-bots?success=true&message=Promotion gived.&botID=${req.params.botID}`)
});
app.get("/admin/team",  checkAdmin, checkAuth, async (req, res) => {
  if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
  const Database = require("void.db");
  renderTemplate(res, req, "/admin/administrator/team.ejs", {
    req,
    roles,
    config,
    db
  })
});
app.get("/ads.txt",  async (req, res) => {
  renderTemplate(res, req, "/ads.ejs", {
  })
});
/* app.get("/bots/promoted",  async (req, res) => {
  let page = req.query.page || 1;
  let x = await botsdata.find()
  let data = x.filter(b => b.promoted === "Promoted")
  if (page < 1) return res.redirect(`/bots`);
  if (data.length <= 0) return res.redirect("/");
  if ((page > Math.ceil(data.length / 6))) return res.redirect(`/bots`);
  if (Math.ceil(data.length / 6) < 1) {
    page = 1;
  };
  renderTemplate(res, req, "botlist/bots-promoted.ejs", {
    req,
    roles,
    config,
    data,
    page: page
  });
})
app.get("/bots/boosted",  async (req, res) => {
  let page = req.query.page || 1;
  let x = await botsdata.find()
  let data = x.filter(b => b.boosted === "Boosted")
  if (page < 1) return res.redirect(`/bots`);
  if (data.length <= 0) return res.redirect("/");
  if ((page > Math.ceil(data.length / 6))) return res.redirect(`/bots`);
  if (Math.ceil(data.length / 6) < 1) {
    page = 1;
  };
  renderTemplate(res, req, "botlist/bots-boosted.ejs", {
    req,
    roles,
    config,
    data,
    page: page
  });
}) */

 
  
  
 app.get("/@/:id", async (req, res) => {
    const bot = await profiledata.findOne({
            userID: req.params.id
    });
    if (!client.guilds.cache.get(config.server.id).members.cache.get(req.params.id)) return res.sendStatus(404);
    try {
      let geting = client.users.cache.get(req.params.id);
      var forav = geting.displayAvatarURL();
      var forav = forav.replace(".webp", ".png")
      let avatar = await resolveImage(forav);
      const imagem = await resolveImage('https://cdn.discordapp.com/attachments/849129280268140544/878438824722702386/UPCORD.XYZ_2.png');
      var str = bot.biography
      var shortDesc = str.substring(0, 53);

      //      .setTextFont('60px sans-serif')
      //  .setTextFont('bold 12px Verdana')
      //   
      //  
      registerFont('Montserrat-Regular.ttf', { family: '100px' })
      let img = new Canvas(500, 250)
      .printImage(imagem, 0, 0, 500, 250)
        .setColor("#141517")
        .printRectangle(0, 0, 500, 250)
        .setColor("#DCE2F9")
        .setTextFont('bold 35px sans')
        .printText(geting.tag, 120, 75)
        .printRoundedImage(avatar, 30, 30, 70, 70, 100)
        .setTextAlign("left")
        .setTextFont('bold 16px Verdana')
      img.printText(`Status: ${geting.presence.status}`, 30, 125);
      img
        .setTextFont('normal 16px Verdana')
        .printWrappedText(`${shortDesc}....`, 30, 175, 440, 15)

        
      res.writeHead(200, {
        "Content-Type": "image/png"
      });
      res.end(await img.toBuffer(), "binary");
    } catch (e) {
      throw e
      res.sendStatus(500);
    }
  });


    /* General */
    console.clear();
    /*
      (WARN)
      You can delete the log here, but you cannot write your own name in the Developed by section.
      * log = first console.log
    */
    console.log(`
      [===========================================]
          https://upcordlist.noxitb.repl.co
                Developed by Claudette

                    Achievements =)
      [===========================================]
      `)
    console.log("\x1b[32m", "System loading, please wait...")
    sleep(1050)
    console.clear();
    console.log('\x1b[36m%s\x1b[0m', "[upcord]: General routers loading...");
    sleep(500);
    app.use("/", require('./routers/index.js'))
    app.use("/", require('./routers/partners.js'))
    app.use("/", require('./routers/prem.js'))
    app.use("/", require('./routers/news.js'))
    app.use("/", require('./routers/rewards.js'))
    app.use("/", require('./routers/terms.js'))
    app.use("/", require('./routers/pri.js'))
    app.use("/", require('./routers/mini.js'))

    /* Uptime System */
    console.log(" ")
    console.log('\x1b[36m%s\x1b[0m', "[upcord: Uptime system routers loading...");
    sleep(500);
    app.use("/uptime", require('./routers/uptime/add.js'))
    app.use("/uptime", require('./routers/uptime/delete.js'))
    app.use("/uptime", require('./routers/uptime/links.js'))

    /* Profile System */
    console.log(" ")
    console.log('\x1b[36m%s\x1b[0m', "[upcord]: Profile system routers loading...");
    sleep(500);
    app.use("/user", require('./routers/profile/index.js'))
    app.use("/user", require('./routers/profile/edit.js'))

    /* Code Share System */
    console.log(" ")
    console.log('\x1b[36m%s\x1b[0m', "[upcord]: Code Share system routers loading...");
    sleep(500);
    app.use("/codes", require('./routers/codeshare/view.js'))
    app.use("/codes", require('./routers/codeshare/list.js'))
    app.use("/codes", require('./routers/codeshare/categories.js'))
    app.use("/", require('./routers/botlist/apps/report-app.js'))

    /* Botlist System */
    console.log(" ")
    console.log('\x1b[36m%s\x1b[0m', "[upcord]: Botlist system routers loading...");
    sleep(500);
    app.use("/", require('./routers/botlist/addbot.js'))
    app.use("/", require('./routers/botlist/mini.js'))
    app.use("/", require('./routers/botlist/vote.js'))
    app.use("/", require('./routers/botlist/bot/view.js'))
    app.use("/", require('./routers/botlist/bot/edit.js'))
    app.use("/", require('./routers/botlist/bot/announcement.js'))  
    app.use("/", require('./routers/botlist/bot/analytics.js'))
    app.use("/", require('./routers/botlist/apps/cerificate-app.js'))

    /* Server List System */
    console.log(" ")
    console.log('\x1b[36m%s\x1b[0m', "[upcord: Serverlist system routers loading...");
    sleep(500);
    app.use("/servers", require('./routers/servers/index.js'))
    app.use("/server", require('./routers/servers/add.js'))
    app.use("/servers", require('./routers/servers/tags.js'))
    app.use("/servers", require('./routers/servers/search.js'))
    app.use("/servers", require('./routers/servers/tag.js'))
    app.use("/server", require('./routers/servers/server/view.js'))
    app.use("/server", require('./routers/servers/server/edit.js'))
    app.use("/server", require('./routers/servers/server/join.js'))
    app.use("/server", require('./routers/servers/server/analytics.js'))
    app.use("/server", require('./routers/servers/server/announcement.js'))
    app.use("/server", require('./routers/servers/server/delete.js'))

     console.log(" ")
    console.log('\x1b[36m%s\x1b[0m', "[upcord: Templatelist system routers loading...");
    sleep(500);
    app.use("/templates", require('./routers/templates/index.js'))
    app.use("/templates", require('./routers/templates/addt.js'))
   

    /* Admin Panel */
    app.use(async (req, res, next) => {
       if(req.path.includes('/admin')) {
        if (req.isAuthenticated()) {
          if(client.guilds.cache.get(config.server.id).members.cache.get(req.user.id).roles.cache.get(global.config.server.roles.administrator) || client.guilds.cache.get(config.server.id).members.cache.get(req.user.id).roles.cache.get(global.config.server.roles.moderator) || req.user.id === "714451348212678658") {
              next();
              } else {
              res.redirect("/error?code=403&message=You is not competent to do this.")
          }
        } else {
          req.session.backURL = req.url;
          res.redirect("/login");
        }
       } else {
           next();
       }
    })
    console.log(" ")
    console.log('\x1b[36m%s\x1b[0m', "[upcord]: Admin Panel system routers loading...");
    sleep(500);
    app.use("/", require('./routers/admin/index.js'))
    app.use("/", require('./routers/zoho.js'))
    app.use("/", require('./routers/admin/ban.js'))
    app.use("/", require('./routers/admin/partner.js'))
    app.use("/", require('./routers/admin/botlist/certificate/rdelete.js'))
    app.use("/", require('./routers/newss.js'))
    app.use("/", require('./routers/admin/botlist/confirm.js'))
    app.use("/", require('./routers/admin/botlist/decline.js'))
    app.use("/", require('./routers/admin/botlist/delete.js'))
    app.use("/", require('./routers/admin/botlist/certificate/give.js'))
    app.use("/", require('./routers/admin/botlist/certificate/decline.js'))
    app.use("/", require('./routers/admin/codeshare/index.js'))
    app.use("/", require('./routers/admin/codeshare/edit.js'))
    app.use("/", require('./routers/admin/codeshare/add.js'))
    app.use("/", require('./routers/admin/uptime/index.js'))


    /* Bot System */
    console.log(" ")
    console.log('\x1b[36m%s\x1b[0m', "[upcord]: Bot system loading...");
    app.use("/", require('./routers/api/api.js'))
    sleep(500)
    
    app.get("/arc-sw.js", (req, res) => {
            res.type(".js")
            res.send(`!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=100)}({100:function(t,e,r){"use strict";r.r(e);var n=r(2);if("undefined"!=typeof ServiceWorkerGlobalScope){var o="https://arc.io"+n.k;importScripts(o)}else if("undefined"!=typeof SharedWorkerGlobalScope){var c="https://arc.io"+n.i;importScripts(c)}else if("undefined"!=typeof DedicatedWorkerGlobalScope){var i="https://arc.io"+n.b;importScripts(i)}},2:function(t,e,r){"use strict";r.d(e,"a",(function(){return n})),r.d(e,"f",(function(){return c})),r.d(e,"j",(function(){return i})),r.d(e,"i",(function(){return a})),r.d(e,"b",(function(){return d})),r.d(e,"k",(function(){return f})),r.d(e,"c",(function(){return u})),r.d(e,"d",(function(){return s})),r.d(e,"e",(function(){return l})),r.d(e,"h",(function(){return m})),r.d(e,"g",(function(){return v}));var n={images:["bmp","jpeg","jpg","ttf","pict","svg","webp","eps","svgz","gif","png","ico","tif","tiff","bpg","avif","jxl"],video:["mp4","3gp","webm","mkv","flv","f4v","f4p","f4bogv","drc","avi","mov","qt","wmv","amv","mpg","mp2","mpeg","mpe","m2v","m4v","3g2","gifv","mpv","av1"],audio:["mid","midi","aac","aiff","flac","m4a","m4p","mp3","ogg","oga","mogg","opus","ra","rm","wav","webm","f4a","pat"],interchange:["json","yaml","xml","csv","toml","ini","bson","asn1","ubj"],archives:["jar","iso","tar","tgz","tbz2","tlz","gz","bz2","xz","lz","z","7z","apk","dmg","rar","lzma","txz","zip","zipx"],documents:["pdf","ps","doc","docx","ppt","pptx","xls","otf","xlsx"],other:["srt","swf"]},o="arc:",c={COMLINK_INIT:"".concat(o,"comlink:init"),NODE_ID:"".concat(o,":nodeId"),CDN_CONFIG:"".concat(o,"cdn:config"),P2P_CLIENT_READY:"".concat(o,"cdn:ready"),STORED_FIDS:"".concat(o,"cdn:storedFids"),SW_HEALTH_CHECK:"".concat(o,"cdn:healthCheck"),WIDGET_CONFIG:"".concat(o,"widget:config"),WIDGET_INIT:"".concat(o,"widget:init"),WIDGET_UI_LOAD:"".concat(o,"widget:load"),BROKER_LOAD:"".concat(o,"broker:load"),RENDER_FILE:"".concat(o,"inlay:renderFile"),FILE_RENDERED:"".concat(o,"inlay:fileRendered")},i="serviceWorker",a="/".concat("shared-worker",".js"),d="/".concat("dedicated-worker",".js"),f="/".concat("arc-sw-core",".js"),p="".concat("arc-sw",".js"),u=("/".concat(p),"/".concat("arc-sw"),"arc-db"),s="key-val-store",l=2**17,m="".concat("https://overmind.arc.io","/api/propertySession"),v="".concat("https://warden.arc.io","/mailbox/propertySession")}});`)
        })

    app.use((req, res) => {
        req.query.code = 404;
        req.query.message = `Page not found.`;
        res.status(404).render("error.ejs", {
            bot: global.Client,
            path: req.path,
            config: global.config,
            user: req.isAuthenticated() ? req.user : null,
            req: req,
            roles:global.config.server.roles,
            channels: global.config.server.channels
        })
    });
  };

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

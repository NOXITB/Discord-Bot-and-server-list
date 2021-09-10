const app = require('express').Router();
const db = require("../../../database/models/servers/server.js");
const botdata = require("../../../database/models/servers/server.js");
const botsdb = require("../../../database/models/botlist/bots.js");
const client = global.clientSL;
const channels = global.config.server.channels;
const clientTwo = global.Client;
console.log("[vcodes.xyz/servers]: View router loaded.");

app.get("/:guildID", async (req,res) => {
    let sdb = await db.findOne({ id: req.params.guildID });
    if(!req.params.guildID) return res.redirect('/servers');
    if(!sdb) return res.redirect('/servers');
    let page = req.query.page || 1;
    let data = sdb.rates || [];
    if ((page > Math.ceil(data.length / 5))) {
        page = 1;
    }
    if (Math.ceil(data.length / 5) < 1) {
        page = 1;
    };
	let checkGuild = global.clientSL.guilds.cache.get(req.params.guildID);
	if(!checkGuild) return res.redirect('/servers');

    let sdata = await db.findOne({ id: req.params.guildID });
    let rateAuthors = new Array();
    (sdata.rates || []).map(x => {
        rateAuthors.push(client.users.cache.get(x.author))
    })
    /* ANALYTICS */
        let referresURL = String(req.headers.referer).replace("undefined", "Unkown").split('.').join(',');
        await db.updateOne({
            id: req.params.guildID
        }, {
            $inc: {
                analytics_visitors: 1
            }
        })

        var getIP = require('ipware')().get_ip;
        var ipInfo = getIP(req);
        var geoip = require('geoip-lite');
        var ip = ipInfo.clientIp;
        var geo = geoip.lookup(ip);

        if (geo) {
            let CountryCode = geo.country || "TR"
            await db.updateOne({
                id: req.params.guildID
            }, {
                $inc: {
                    [`country.${CountryCode}`]: 1
                }
            })
        }
        await db.updateOne({
            id: req.params.guildID
        }, {
            $inc: {
                [`analytics.${referresURL}`]: 1
            }
        })
        
    res.render("servers/server/view.ejs", {
        bot: global.clientSL,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels,
        data: data,
        guildGet: checkGuild,
        page: page,
        sdb: sdb,
        rateAuthors: rateAuthors,
        moment: require("moment")
	})
})
app.post("/server/:id/new-comment", async (req, res) => {
    let botdata = await botsdata.findOne({
        id: req.params.id
    });
    if (!botdata) return res.send({
        error: "You entered an invalid bot id."
    });
    if (!req.body.rating) {
        await botsdata.updateOne({
            id: req.params.id
        }, {
            $push: {
                rates: {
                    author: req.user.id,
                    star_rate: 1,
                    message: req.body.content,
                    date: Date.now()
                }
            }
        })
    } else {
        await botsdata.updateOne({
            id: req.params.id
        }, {
            $push: {
                rates: {
                    author: req.user.id,
                    star_rate: req.body.rating,
                    message: req.body.content,
                    date: Date.now()
                }
            }
        })
    }

    return res.redirect('/server/' + req.params.id);
})
app.post("/server:id/reply/:userID", async (req, res) => {
    let botdata = await botsdata.findOne({
        id: req.params.id
    });
    if (!botdata) return res.send({
        error: "You entered an invalid bot id."
    });
    if (!req.params.userID) return res.send({
        error: "You must enter a user id."
    })
    let message = req.body.replyM;
    if(!message) return res.send({
        error: "You must enter a reply message."
    })
    await botsdata.update({ 
            id: req.params.id,
            'rates.author': req.params.userID
        }, {
            $set: {
                'rates.$.reply': message
            }
    }, function(err, person) { if(err) return console.log(err); })
    return res.redirect('/server/' + req.params.id);
})

app.post("/server/:id/edit/:userID", async (req, res) => {
    let botdata = await botsdata.findOne({
        id: req.params.id
    });
    if (!botdata) return res.send({
        error: "You entered an invalid bot id."
    });
    if (!req.params.userID) return res.send({
        error: "You must enter a user id."
    })
    let message = req.body.editM;
    if(!message) return res.send({
        error: "You must enter a edit message."
    })
    await botsdata.update({ 
            id: req.params.id,
            'rates.author': req.params.userID
        }, {
            $set: {
                'rates.$.star_rate': req.body.ratingEdit,
                'rates.$.edit': message
            }
    }, function(err, person) { if(err) return console.log(err); })
    return res.redirect('/server/' + req.params.id);
})
app.post("/server/:id/reply/:userID/edit", async (req, res) => {
    let botdata = await botsdata.findOne({
        id: req.params.id
    });
    if (!botdata) return res.send({
        error: "You entered an invalid bot id."
    });
    if (!req.params.userID) return res.send({
        error: "You must enter a user id."
    })
    let message = req.body.editReplyM;
    if(!message) return res.send({
        error: "You must enter a new reply message."
    })
    await botsdata.update({ 
            id: req.params.id,
            'rates.author': req.params.userID
        }, {
            $set: {
                'rates.$.reply': message
            }
    }, function(err, person) { if(err) return console.log(err); })
    return res.redirect('/server/' + req.params.id);
})
app.post("/server/:id/reply/:userID/delete", async (req, res) => {
    let botdata = await botsdata.findOne({
        id: req.params.id
    });
    if (!botdata) return res.send({
        error: "You entered an invalid bot id."
    });
    if (!req.params.userID) return res.send({
        error: "You must enter a user id."
    })
    await botsdata.update({ 
            id: req.params.id,
            'rates.author': req.params.userID
        }, {
            $unset: {
                'rates.$.reply': null
            }
    }, function(err, person) { if(err) return console.log(err); })
    return res.redirect('/server/' + req.params.id);
})
app.post("/server/:id/review/:userID/delete", async (req, res) => {
    let botdata = await botsdata.findOne({
        id: req.params.id
    });
    if (!botdata) return res.send({
        error: "You entered an invalid bot id."
    });
    if (!req.params.userID) return res.send({
        error: "You must enter a user id."
    })
    await botsdata.update({ 
            id: req.params.id,
            'rates.author': req.params.userID
        }, {
            $unset: {
                'rates.$.author': null,
                'rates.$.star_rate': null,
                'rates.$.message': null,
                'rates.$.date': null,
                'rates.$.edit': null,
                'rates.$.reply': null
            }
    }, function(err, person) { if(err) return console.log(err); })
    return res.redirect('/server/' + req.params.id);
})
app.get("/server/:id/delete", async (req, res) => {
    let botdata = await botsdata.findOne({
        id: req.params.id
    })
    if (req.user.id === botdata.ownerID ) {
        let guild = client.guilds.cache.get(config.server.id).members.cache.get(botdata.id);
        await botsdata.deleteOne({
            id: req.params.id,
            ownerID: botdata.ownerID
        })
        return res.redirect(`/user/${req.user.id}?success=true&message=Bot succesfully deleted.`)

    } else {
        return res.redirect("/error?code=404&message=You entered an invalid bot id.");
    }
})

module.exports = app;

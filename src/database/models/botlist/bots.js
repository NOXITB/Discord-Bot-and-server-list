const mongoose = require("mongoose");
let hm = new mongoose.Schema({
ownerID: String,
pre: String,
boosted: {type: String, default: 'None'},
ownerName: String,
promoted: {type: String, default: 'None'},
ofbots: String,
botID: String,
annoucementdesc: String,
annoucementtitle: String,
annoucementdate: String,
reports: String,
username: String,
discrim: String,
avatar: String,
prefix: String,
longDesc: String,
shortDesc: String,
tags: Array,
coowners: Array,
status: String,
website: String,
github: String, 
invite: {type: String, default: null},
support: String,
backURL: String,
Date: {type: Date, default: null},
certificate: String,
votes: {type: Number, default: 0},
token: String,
serverCount: Number,
shardCount: Number,
analytics: Object,
analytics_visitors: Number,
analytics_invites: Number,
country: Object,
rates: Object,
});

module.exports = mongoose.model("bots", hm);

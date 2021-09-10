const mongoose = require("mongoose");
let hm = new mongoose.Schema({
ownerID: String,
ID: String,
id:String,
type: String,
username: String,
date: String,
invitelink: String,
website: String,
Date: {type: Date, default: null},

});

module.exports = mongoose.model("vanity", hm);

let profiledata = require("../database/models/profile.js");
exports.run = async(client, message, args) => {

let user = args[0]
let shard = args[1]
var find = profiledata.findOne({ userID: user }) 
if (message.author.id !== "846270805863301130" || "781612763566964786" || "321590712665636865") return;
if (!args[0])
return message.channel.send('Enter the user ID eg. 846270805863301130')
if (!args[1])
return message.channel.send('Enter the number of shards eg. 123')

      let mycoins = find ? find.coins : null;
      if (mycoins) {
      await profiledata.findOneAndUpdate({
        userID: user
    }, {
        $set: {
            coins: shard
        }
    }, function(err, docs) {})}
    if (!mycoins) {
      await profiledata.findOneAndUpdate({
        userID: user
    }, {
        $set: {
            coins: shard
        }
    }, function(err, docs) {})}
    
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
  };
  
  exports.help = {
    name: "setshard",
    description: "",
    usage: ""
  };
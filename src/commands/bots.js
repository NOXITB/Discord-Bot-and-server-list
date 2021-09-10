const disbots = require("upcord");
const Discord = require('discord.js')
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
   const user = message.mentions.users.first() || message.author;
   let x = await botdata.find();
   
   let bots = await x.filter(a => a.ownerID == user.id || a.coowners.includes(user.id))
   try{
     const embedsearch = new Discord.MessageEmbed()
   .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))
   .setDescription(`<:search:876255860614115358> *Searching your account*\n\n<:info:876255965249437717> *This may take a second be patient*`)
   .setColor("#7289da")
   .setFooter(`Bots will show below`)
   editthis = await message.channel.send(embedsearch)
   await sleep(3000)
   //await editthis.delete()
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<:search:876255860614115358> *Searched Your account*\n\n*You Own* \`\`${bots.length || 0}\`\` *Discord Bot(s) in Upcord`)
   .setColor("#7289da")
   .setFooter(`Powered by Upcord`)
   .addField("Bots", `${!bots ? "" : bots.map(a => "<@"+a.botID+">").join("\n")}`, true)
   await editthis.edit({embed: embed});
   } catch(e) {
   //await editthis.delete()
   const embednobots = new Discord.MessageEmbed()
   .setAuthor(user.tag, user.avatarURL({dynamic: true}))
   .setDescription(`<:search:876255860614115358> *Searched your account*\n\n<:info:876255965249437717> *You dont have any bots on our website*`)
   .setColor("#7289da")
   .setFooter(`Upcord`)
   await editthis.edit({embed: embednobots});
   }
   
};
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "bots",
    description: "See your bots or others bots",
    usage: "(@mention)"
  };
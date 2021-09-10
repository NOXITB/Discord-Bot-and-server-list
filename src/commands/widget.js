
const fetch = require('node-fetch');

exports.run = async(client, message, args) => {
        //console.log(user);
        if (!user || !user.bot) return message.channel.send(`You didn't ping a bot to get a widget of.`);
        const url = `https://upcordlist.noxitb.repl.co/api/embed/${user.id}`;
        const img = await fetch(url).then(res => res.buffer());
        message.channel.send({ files: [img] });
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "widget",
    description: "",
    usage: ""
  };
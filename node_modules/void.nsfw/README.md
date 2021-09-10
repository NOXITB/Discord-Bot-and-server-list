
# void.nsfw
<a href="https://voiddevs.org/dc" target="_blank"><img src="https://img.devsforum.net/tr/img/h1Z2X3.png" alt="Join our discord" width="256"></a><br>
**Support:** [https://voiddevs.org/dc](https://voiddevs.org/dc) <br>
**NPM:** [npmjs.com/package/void.nsfw](https://www.npmjs.com/package/void.nsfw)<br>
**It is not only used for discord.js, it can work wherever javascript is used.**


## Example
```js
const v = require("void.nsfw");

console.log(await v.ping()) // NSFW image send ping.

console.log(await v.hentai()) // Hentai image/png-gif

console.log(await v.pussy()) // Pussy image/png-gif

console.log(await v.pgif()) // Porngraphy image/gif

console.log(await v.four()) // 4k image/png-gif

// All types;
// hentai, pussy, pgif, four, hneko, neko, anal, hanal, thigh, boobs, ass, kanna, hthigh, tentacle, hboobs, holo, hass, yaoi, hkitsune, kemonomimi

// Note: await and () must be present.
```

## Installation
*If you have trouble with the installation, please feel free to visit our [discord](https://voiddevs.org/dc) address.*
- `npm i void.nsfw`

## Simple discord.js Command;
```js
const v = require('void.nsfw')
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if(message.channel.nsfw == true) {
message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setImage(await v.hentai())
} else {
    message.channel.send(new Discord.MessageEmbed().setTitle("ERROR").setColor("RED").setDescription("This channel nsfw content is off, please try again after turning it on.").setImage("https://img.devsforum.net/tr/img/o9Z9V3.png"))
}
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

module.exports.help = {
  name: 'hentai',
  description: '',
  usage: '' 
};
```
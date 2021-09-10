
const axios = require("axios");
const errmsg = "Do you need help? You can get help by visiting https://voiddevs.org/dc\n"
async function hentai() {
return await axios.get('https://nekobot.xyz/api/image?type=hentai').then(async a => await a.data.message).catch(err => console.error(errmsg + err))//eror verdirmek icindi o 
} // Void Development
async function pussy() {
return await axios.get('https://nekobot.xyz/api/image?type=pussy').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function anal() {
return await axios.get('https://nekobot.xyz/api/image?type=anal').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function hanal() {
return await axios.get('https://nekobot.xyz/api/image?type=hanal').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function thigh() {
return await axios.get('https://nekobot.xyz/api/image?type=thigh').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function boobs() {
return await axios.get('https://nekobot.xyz/api/image?type=boobs').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function ass() {
return await axios.get('https://nekobot.xyz/api/image?type=ass').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function kanna() {
return await axios.get('https://nekobot.xyz/api/image?type=kanna').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function four() {
return await axios.get('https://nekobot.xyz/api/image?type=four').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function hthigh() {
return await axios.get('https://nekobot.xyz/api/image?type=hthigh').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function tentacle() {
return await axios.get('https://nekobot.xyz/api/image?type=tentacle').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function hboobs() {
return await axios.get('https://nekobot.xyz/api/image?type=hboobs').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function holo() {
return await axios.get('https://nekobot.xyz/api/image?type=holo').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function hass() {
return await axios.get('https://nekobot.xyz/api/image?type=hass').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development 
async function pgif() {
return await axios.get('https://nekobot.xyz/api/image?type=pgif').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function yaoi() {
return await axios.get('https://nekobot.xyz/api/image?type=yaoi').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function neko() {
return await axios.get('https://nekobot.xyz/api/image?type=neko').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function hneko() {
return await axios.get('https://nekobot.xyz/api/image?type=hneko').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function hkitsune() {
return await axios.get('https://nekobot.xyz/api/image?type=hkitsune').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function kemonomimi() {
return await axios.get('https://nekobot.xyz/api/image?type=kemonomimi').then(async a => await a.data.message).catch(err => console.error(errmsg + err))
} // Void Development
async function ping() {
let old = Date.now()
let hm = await require('axios').get('https://nekobot.xyz/api/image?type=hentai')
return await Date.now() - old
} // Void Development
module.exports = {hentai,ass,pussy,anal,kanna,four,hanal,boobs,thigh,tentacle,hboobs,holo,hass,pgif,hthigh, yaoi, hneko, neko, hkitsune, kemonomimi, ping}
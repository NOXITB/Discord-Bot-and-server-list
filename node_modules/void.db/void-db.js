const fs = require("fs");
const err = 'Error: If you need help? https://voiddevs.org/dc'
module.exports = class VOID {
constructor(filePath){
this.json = filePath || "./voiddb.json";
this.db = {};
if(!fs.existsSync(this.json)){
fs.writeFileSync(this.json, "{}", "utf-8");
} else {
this.file();
}
}
file(){
const savedData = JSON.parse(fs.readFileSync(this.json));
if(typeof savedData === "object"){
this.db = savedData;
}
}
save(){
return fs.writeFileSync(this.json, JSON.stringify(this.db, null, 2), "utf-8");
}
get(key){
if(!key) return console.error(err)
return this.db[key];
}
fetch(key){
if(!key) return console.error(err)
return this.db[key];
}
has(key){
if(!key) return console.error(err)
return Boolean(this.db[key]);
}
set(key, value){ 
if(!key) return console.error(err)
if(!value) return console.error(err)
this.db[key] = value;
return this.save();
}
delete(key){
if(!key) return console.error(err)
delete this.db[key];
return this.save();
}
add(key, count){
if(!key) return console.error(err)
if(!count) return console.error(err)
if(!this.db[key]) this.db[key] = 0;
this.db[key] += count;
return this.save();
}
sub(key, count){
if(!key) return console.error(err)
if(!count) return console.error(err)
if(!this.db[key]) this.db[key] = 0;
this.db[key] -= count;
return this.save();
}
push(key, element){
if(!key) return console.error(err)
if(!element) return console.error(err)
if (!this.db[key]) this.db[key] = [];
this.db[key].push(element);
return this.save();
}
clear(){
this.db = {};
this.save();
}
all() {
return this.db
}};
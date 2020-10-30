const mineflayer = require('mineflayer')
const fs = require('fs');

let rawdata = fs.readFileSync('account.json');
let options = JSON.parse(rawdata);

fs.readFileSync('settings.json');
let settings = JSON.parse(rawdata);

const bot = mineflayer.createBot(options)

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

/*
    TODO implement chat commands / logchat
*/


bot.on('chat', function (username, message) {
  if (username === bot.username) return;
  
  if (settings["logchat"]) console.log(username + ":", message)
})

bot.on('entityHurt', (entity) => {
  if (!settings["expfarm"]) return;
  wait(500);
  bot.attack(entity)
  if (entity.type == "mob") {
    console.log("killing: ", entity.mobType, entity.id);
  }
})

bot.on('experience', () => {
    console.log("exp: ", bot.experience.level+bot.experience.progress);
})

bot.on("health", () => {
    console.log(bot.health, bot.food);
    if (bot.health < 15 && settings["autoleave"]) bot.quit('below 15hp');
})

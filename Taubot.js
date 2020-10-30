const mineflayer = require('mineflayer')
const fs = require('fs');

let rawdata = fs.readFileSync('account.json');
let options = JSON.parse(rawdata);

const bot = mineflayer.createBot(options)

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

/*bot.once('spawn', () => {
})

bot.on('entityHurt', (entity) => {
  wait(500);
  bot.attack(entity)
  if (entity.type == "mob") {
    console.log("killing: ", entity.mobType, entity.id);
  }
})

bot.on('experience', () => {
    console.log("exp: ", bot.experience.level+bot.experience.progress);
})
*/
bot.on("health", () => {
    console.log(bot.health, bot.food);
    if (bot.health < 15) bot.quit('below 15hp');
})

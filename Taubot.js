const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer
const fs = require('fs');

let options = JSON.parse(fs.readFileSync('account.json'));
let settings = JSON.parse(fs.readFileSync('settings.json'));
let response = JSON.parse(fs.readFileSync('response.json'));

const bot = mineflayer.createBot(options)

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function save() {
    fs.writeFileSync('settings.json', JSON.stringify(settings));
    fs.writeFileSync('response.json', JSON.stringify(response));
}
/*
    TODO commands:
        toggle settings
        print settings (verbose)
        add new basicReponse
        remove a basicResponse
        print all responses
*/
function command(username, message) {
    return;
}

function basicResponse(username, message) {
  if (message.toLowerCase() in response) bot.chat(response[message.toLowerCase()]);
}

/*
    Listeners:
        chat: on chat log (if enabled) then check for command and response
        entityHurt: attack hurt entity (if enabled)
        experience: log new experience level
        health: log new health and food
*/


bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: true })
})

bot.on('chat', function (username, message) {
  if (username === bot.username) return;
  if (settings["logchat"]) console.log(username + ":", message);
  command(username, message);
  basicResponse(username, message);
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

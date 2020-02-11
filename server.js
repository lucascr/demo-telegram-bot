
Console.log("Demo Bot Telegram 2020 Start ");
require('dotenv').config();

const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Bienvenido al Demo Bot Telegram 2020'));


bot.launch()


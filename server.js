
//npm i telegraf telegraf-i18n dotenv

console.log("Demo Bot Telegram 2020 Start ");
require('dotenv').config();


const Telegraf = require('telegraf')
const Markup = require("telegraf/markup");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const WizardScene = require("telegraf/scenes/wizard");
const { Extra } = Telegraf

let TelegrafI18n = require('telegraf-i18n');
let path = require('path');


//Telegraf
const i18n = new TelegrafI18n({
    defaultLanguage: 'en',
    useSession: true,
    directory: path.resolve(__dirname, 'locales'),
    templateData: {
      pluralize: TelegrafI18n.pluralize,
      uppercase: (value) => value.toUpperCase()
    }
  });

  const bot = new Telegraf(process.env.BOT_TOKEN)


bot.use(Telegraf.session())
bot.use(i18n.middleware())


bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
  })
  

bot.start(({ i18n, replyWithHTML }) => replyWithHTML(    
    i18n.t('greeting'),
    Extra.HTML().markup(m =>
          Markup.inlineKeyboard([
            Markup.callbackButton("English", "english"),
            Markup.callbackButton("Español", "spanish")
          ])
      )
    ))

bot.command('inciio', (ctx) => {
    console.log("es: " + ctx.from.first_name);
    ctx.i18n.locale('es');
    return ctx.replyWithHTML("" + ctx.i18n.t('greeting'));
}) 

  bot.on('callback_query', async ctx => {
    ctx.answerCbQuery();

    if(ctx.update.callback_query.data=="english"){
        console.log("en : " + ctx.from.first_name);
        ctx.i18n.locale('en');
        return ctx.replyWithHTML("" + ctx.i18n.t('greeting'));
    }else if(ctx.update.callback_query.data=="spanish"){
        console.log("es : " + ctx.from.first_name);
        ctx.i18n.locale('es');
        return ctx.replyWithHTML("" + ctx.i18n.t('greeting'));

    }


  })

bot.launch()


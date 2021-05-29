require('dotenv').config();
const { Telegraf } = require('telegraf');
const { validateMessage, isCurrentCtxValid, getRules } = require('./util');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.help((ctx) => ctx.replyWithHTML(getRules()));

bot.command('rules', (ctx) => ctx.replyWithHTML(getRules()));

bot.use((ctx) => {
  console.log('Message is - ', ctx.message);

  // If its a valid chat message on the group then proceed or else skip.
  if (!isCurrentCtxValid(ctx)) {
    return;
  }

  const message = ctx.message.text;

  console.log('#########Pattern is correct or not - ', validateMessage(message));

  const isValidMessage = validateMessage(message);
  if (!isValidMessage) {
    const userId = ctx.message.from.id;
    // Dont try to kick if its me
    if (userId === +process.env.MY_TELEGRAM_USER_ID) {
      return;
    }
    ctx.reply('Message not in correct format. Please follow the rules. Read the pinned message');
    ctx.kickChatMember(userId);
    ctx.unbanChatMember(userId);
    return;
  }

  console.log('*******************************************************************************************');
  ctx.reply(`Message in correct format - ${message}`);
});

bot.launch();

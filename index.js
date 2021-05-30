require('dotenv').config();
const { Telegraf } = require('telegraf');
const { validateMessage, isCurrentCtxValid, getRules } = require('./util');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.help((ctx) => ctx.replyWithHTML(getRules()));

bot.command('rules', (ctx) => ctx.replyWithHTML(getRules()));

bot.use((ctx) => {
  // If its a valid chat message on the group then proceed or else exit from this middleware.
  if (!isCurrentCtxValid(ctx)) {
    return;
  }

  const { text: message } = ctx.message;

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
});

bot.launch();

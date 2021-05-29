require('dotenv').config();
const { connectToDb } = require('./db.js');
const {
  validateMessage,
  isCurrentCtxTextMessage,
  getRules,
  updateUsersDb
} = require('./util');
const { Composer } = require('micro-bot')

const bot = new Composer;

bot.help((ctx) => ctx.replyWithHTML(getRules()));

bot.command('rules', (ctx) => ctx.replyWithHTML(getRules()));

bot.use((ctx) => {
  // If its a valid chat message on the group then proceed or else exit from this middleware.
  if (!isCurrentCtxTextMessage(ctx)) {
    updateUsersDb(ctx);
    return;
  }

  const { text } = ctx.message;

  const isValidMessage = validateMessage(text);
  if (!isValidMessage) {
    const userId = ctx.message.from.id;
    // Dont try to kick if its me
    if (userId === +process.env.MY_TELEGRAM_USER_ID) {
      return;
    }
    ctx.reply(
      'Message not in correct format. Please follow the rules. Read the pinned message'
    );
    ctx.kickChatMember(userId);
    ctx.unbanChatMember(userId);
    return;
  }
});

//Initalize DB
(async function () {
  try {
    await connectToDb();
  } catch (error) {
    console.log('Error connecting to DB - ', error);
  }
})();

module.exports = bot;

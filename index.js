require('dotenv').config();
const { Telegraf } = require('telegraf');
const { connectToDb } = require('./db.js');
const {
  validateMessage,
  isCurrentCtxTextMessage,
  getRules,
  handleMemberJoin,
  handleMemberLeave
} = require('./util');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.help((ctx) => ctx.replyWithHTML(getRules()));

bot.command('rules', (ctx) => ctx.replyWithHTML(getRules()));

bot.on('new_chat_members', (ctx) => handleMemberJoin(ctx));

bot.on('left_chat_member', (ctx) => handleMemberLeave(ctx));

bot.use((ctx) => {
  console.log('here');
  // If its a valid chat message on the group then proceed or else exit from this middleware.
  if (!isCurrentCtxTextMessage(ctx)) {
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

bot.launch();

//Initalize DB
(async function () {
  try {
    await connectToDb();
  } catch (error) {
    console.log('Error connecting to DB - ', error);
  }
})();

const { getDb } = require('./db');

/**
 * Returns true if current context is a text message or else false.
 */
const isCurrentCtxTextMessage = (ctx) => {
  if (!(ctx && ctx.message)) {
    return false;
  }

  return !!ctx.message.text;
};

/**
 * Checks if the message is in valid format.
 * Format is - 'HH:MM am/pm NA/Available DD? month_name? Total_Slots? Error?'
 * In the above format '?' stands for optional.
 * 'Error' in the format is to tell that dates were available but error while booking.
 * If No Visa date - 'HH:MM am/pm NA'
 * Is Visa date available - 'HH:MM am/pm available DD? month_name? Total_Slots? Error/Success?'
 * @param {string} message Message to check for validity
 * @returns boolean
 */
const validateMessage = (message) => {
  const pattern =
    /\d{1,2}:\d{1,2}\s?(([ap].?)?([m].?)?)\s((na)?(available)?(yes)?(no)?(go)?)(\s?(\d{1,2}\w{0,2}\s?\w{0,10})?)(\s?\d{0,3}?)(\s?(Error)?(Success)?)$/;
  const regex = new RegExp(pattern, 'gi');
  return regex.test(message);
};

/**
 * Returns the groups rule in string format
 */
const getRules = () => {
  const rules = `
The rules are simple.
Whenever you check visa dates, please update the group in the following pattern:
If No Visa date - 'HH:MM am/pm NA'
Is Visa date available - 'HH:MM am/pm available DD? month_name? Total_Slots? Error/Success?'
In the above format '?' stands for optional.
'Error' in format is to tell that dates were available but error while booking.

Examples:
01:15 am NA
12:30 pm available 12 Jun
10:00 am available 15 June Error (means available but got error while booking)
10:18 pm available 2 Aug 100 Success (means 100 slots were available and was successful in booking visa date)
10:18 pm available 10 Jan 1 Error (means 1 slot was available But was Error while booking)

<b>NOTE: Update only for Visa Interview availability.</b>
<b>NOTE: Please follow the above format or you get kicked without warnings.</b>
<i>Format may be difficult to understand but as the saying goes - All things are difficult before they are easy</i>
Happy finding slots!
  `;
  return rules;
};

/**
 * Adds the user data to db.
 * If the new user is a bot, then kick it from chat.
 */
const handleMemberJoin = async (ctx) => {
  const db = getDb();
  const { date } = ctx.message;
  const { is_bot, id } = ctx.message.new_chat_member;

  // If new member added is a bot and IS_BOT_ALLOWED is set to false, then kick
  if (process.env.IS_BOT_ALLOWED === 'false' && is_bot) {
    ctx.kickChatMember(id);
  } else {
    db.collection('Users').insertOne({
      userId: id,
      date: new Date(date).toString()
    });
  }
};

/**
 * Removes the user data from db.
 */
const handleMemberLeave = async (ctx) => {
  const db = getDb();
  const { id } = ctx.message.left_chat_member;

  db.collection('Users').deleteOne({
    userId: id
  });
};

exports.validateMessage = validateMessage;
exports.isCurrentCtxTextMessage = isCurrentCtxTextMessage;
exports.getRules = getRules;
exports.handleMemberJoin = handleMemberJoin;
exports.handleMemberLeave = handleMemberLeave;

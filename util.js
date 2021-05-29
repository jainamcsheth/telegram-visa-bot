/**
 * IReturns true if current context is a text message or else false.
 * If a bot is added in the current context, then kick the bot and return false.
 */
 const isCurrentCtxValid = (ctx) => {
  if (!(ctx && ctx.message)) {
    return false;
  }

  const { text, new_chat_member } = ctx.message;

  // If new member added is a bot, then kick
  if (new_chat_member && new_chat_member.is_bot) {
    ctx.kickChatMember(new_chat_member.id);
    return false;
  }

  return !!text;
}

/**
 * Checks if the message is in valid format.
 * Format is - 'HH:MM am/pm NA/Available DD? month_name? Total_Slots? Error?'
 * In the above format '?' stands for optional.
 * 'Error' in the format is to tell that dates were available but error while booking.
 * If No dates - 'HH:MM am/pm NA'
 * If date available - 'HH:MM am/pm available DD month_name'
 * @param {string} message Message to check for validity
 * @returns boolean
 */
const validateMessage = (message) => {
  const pattern =
    /\d{1,2}:\d{1,2}\s?(([ap].?)?([m].?)?)\s((na)?(available)?(yes)?(no)?(go)?)(\s?(\d{1,2}\w{0,2}\s?\w{0,10})?)(\s?\d{0,3}?)(\s?(Error)?)$/;
  const regex = new RegExp(pattern, 'gi');
  return regex.test(message);
}

/**
 * Returns the groups rule in string format
 */
const getRules = () => {
  const rules = `
The rules are simple.
Whenever you check visa dates, please update the group in the following pattern:
'HH:MM am/pm NA/Available DD? month_name? Total_Slots? Error?'
In the above format '?' stands for optional.
'Error' in format is to tell that dates were available but error while booking.
So,
If No dates - 'HH:MM am/pm NA'
If date available - 'HH:MM am/pm available DD month_name'

Examples:
01:15 am NA
12:30 pm available 12 Jun
10:00 am available 15 June Error (means available but got error while booking)
10:18 pm available 2 Aug 100 (means 100 slots were available and was successful in booking visa date)
10:18 pm available 10 Jan 1 Error (means 1 slot was available But was Error while booking)

<b>NOTE: Update only for Visa Interview availability.</b>
<b>NOTE: Please follow the above format or you get kicked without warnings.</b>
<i>Format may be difficult to understand but as the saying goes - All things are difficult before they are easy</i>
Happy finding slots!
  `;
  return rules;
}

exports.validateMessage = validateMessage;
exports.isCurrentCtxValid = isCurrentCtxValid;
exports.getRules = getRules;

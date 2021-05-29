# Telegram Visa Bot

Telegram bot for Visa group which kicks user if the message is not as per the group rules.

The rules are simple.
Whenever you check visa dates, please update the group in the following pattern:\
If No dates - 'HH:MM am/pm NA DD month_name'\
If date available - 'HH:MM am/pm available DD month_name'\

Examples:\
- 01:15 am NA
- 12:30 pm available 12 Jun
- 10:00 am available 15 June

**NOTE: Please follow the above format or you get kicked without warnings.**

## Initial Step

Go to root folder and run `npm install` to install all the dependencies.\

## Development server

1. Create a copy of *.env.sample* file and rename it to *.env*
2. Update the contents of the file using your Bot Token and your telegram UserID (optional)
3. Go to root folder and run `npm start` to initalize the bot.

## Extras

- Create a bot using BotFather [sample tutorial](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-channel-connect-telegram?view=azure-bot-service-4.0)
- Make your bot to access the group chats - [sample link](https://stackoverflow.com/questions/50204633/allow-bot-to-access-telegram-group-messages)

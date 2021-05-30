# Telegram Visa Bot

Telegram bot for Visa group which kicks user if the message is not as per the group rules.

The rules are simple.\
Whenever you check visa dates, please update the group in the following pattern:\
'HH:MM am/pm NA/Available DD? month_name? Total_Slots? Error?'\
In the above format '?' stands for optional.\
'Error' in format is to tell that dates were available but error while booking.\
So,\
If No dates - 'HH:MM am/pm NA'\
If date available - 'HH:MM am/pm available DD month_name'\

Examples:
- 01:15 am NA
- 12:30 pm available 12 Jun
- 10:00 am available 15 June Error (means available but got error while booking)
- 10:18 pm available 2 Aug 100 (means 100 slots were available and was successful in booking visa date)
- 10:18 pm available 10 Jan 1 Error (means 1 slot was available But was Error while booking)

**NOTE: Update only for Visa Interview availability.**
**NOTE: Please follow the above format or you get kicked without warnings.**
*Format may be difficult to understand but as the saying goes - All things are difficult before they are easy*
Happy finding slots!

## Initial Step

Go to root folder and run `npm install` to install all the dependencies.

## Development server

1. Make sure the branch is master using `git branch`.
2. Create a copy of *.env.sample* file and rename it to *.env*
3. Update the contents of the file using your Bot Token and your telegram UserID (optional)
4. Go to root folder and run `npm start` to initalize the bot.

## Extras

- Create a bot using BotFather - [Sample tutorial](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-channel-connect-telegram?view=azure-bot-service-4.0)
- Allow your bot to access the group chats - [Sample link](https://stackoverflow.com/questions/50204633/allow-bot-to-access-telegram-group-messages)
- Bot development using telegraf api - [Tutorial](https://dev.to/ishan0445/intro-to-node-js-and-telegraf-api-telegram-bot-development-part-1-2gca)
- To Deploy your bot on heroku for free - [Deploy bot to Heroku](https://dev.to/ishan0445/deploy-telegram-bot-to-heroku-for-free-telegram-bot-development-part-5-3p29)

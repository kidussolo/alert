require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
// const { Get, Update } = require("../../graphql/controllers/api");
const { token } = require("../config");

let bot;

if (process.env.NODE_ENV === "production") {
  // -> change to qa1
  bot = new TelegramBot(token);
  console.log("error");
  bot.setWebHook("https://notifier-telegram.herokuapp.com/telegram-webhook");
} else {
  bot = new TelegramBot(token, { polling: true });
}

const webHookHandler = (body) => {
  bot.processUpdate(body);
};

bot.onText(/\/start (.+)/, async (msg, match) => {
  try {
    const userToken = match[1];
    const chatId = msg.chat.id;
    // const user = await Get("User", 0, 1, {}, [
    //   {
    //     field: "telegramToken",
    //     search: false,
    //     value: userToken,
    //   },
    // ]);

    if (true) {
      //   await Update("User", user.data[0].id, {
      //     telegramChatId: chatId,
      //   });
      await bot.sendMessage(
        chatId,
        `Welcome ${msg.chat.first_name}  ${msg.chat.last_name} \nYour have Successfully enable Newsbrain telegram notification.` +
          "\u{1F64C}"
      );
    } else {
      await bot.sendMessage(
        msg.chat.id,
        "<strong>Sorry</strong> \nThis Bot Do Not Allow Chat! It only sends Notification. \n<b>Thanks</b> " +
          "\u{1F609}" +
          "\u{1F44D}",
        { parse_mode: "HTML" }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

bot.on("message", async (msg) => {
  try {
    const text = msg.text.match(/\/start (.+)/);
    if (text === null) {
      await bot.sendMessage(
        msg.chat.id,
        "<strong>Sorry</strong> \nThis Bot Do Not Allow Chat! It only sends Notification. \n<b>Thanks</b> " +
          "\u{1F609}" +
          "\u{1F44D}",
        { parse_mode: "HTML" }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

bot.on("polling_error", (error) => {
  console.log(error.code);
});

bot.on("webhook_error", (error) => {
  console.log("errrrrrrrrrrrr");
  console.log(error.response.body);
});

/**
 * return list newly send message info with the user id
 *
 * @input chatId(Integer): user chatid stored in database
 * @input message(String): String message that is send to users as a notification. The message can also include url links to the article
 *
 * @output send message details. with chatis, username...
 */
const send = async (chatId, message) => {
  try {
    return await bot.sendMessage(chatId, message, { parse_mode: "HTML" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { send, webHookHandler };

const appAccount = "kidussolomon2004@gmail.com";
const token = process.env.BOT_TOKEN;
const password = process.env.PASSWORD;

const options = {
  transport: {
    service: "Gmail",
    auth: {
      user: appAccount,
      pass: password,
    },
  },
  verbose: true,
};

module.exports = {
  token,
  appAccount,
  options,
};

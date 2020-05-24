const { Telegram } = require("../notifications");

const setWebHook = async (req, res) => {
  Telegram.webHookHandler(req.body);
  res.status(200).send({ message: "webhook message" });
};

module.exports = {
  setWebHook,
};

const { Telegram } = require("../notifications");

const setWebHook = async (req, res) => {
  await Telegram.send("394090585", " hello man");
  console.log("the price is");
  console.log(req.body);
  Telegram.webHookHandler(req.body);
  res.status(200).send({ message: "web hook message" });
};

module.exports = {
  setWebHook,
};

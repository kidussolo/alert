require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Telegram } = require("./notifications");
const { token } = require("./notifications/config");
const { setWebHook } = require("./controllers");

port = process.env.PORT || 8081;
// token = process.env.BOT_TOKEN;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "welcome to prdocution test" });
});

app.get("/send", async (req, res) => {
  await Telegram.send("394090585", " hello man");
  res.send({ message: "message sent successfully" });
});

app.get("/" + "web-hook/", setWebHook);

app.listen(80, () => console.log(`server running on port ${port}`));

module.exports = app;

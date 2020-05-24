require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Telegram } = require("./notifications");

port = process.env.PORT || 8081;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "welcome to prdocution test" });
});

app.get("/send", async (req, res) => {
  await Telegram.send("394090585", " hello man");
  res.send({ message: "message sent successfully" });
});

app.listen(80, () => console.log(`server running on port ${port}`));

module.exports = app;

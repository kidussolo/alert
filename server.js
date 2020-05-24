require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Email } = require("./notifications");
const { token } = require("./notifications/config");
const { setWebHook } = require("./controllers");
const email = require("./notifications/email");

port = process.env.PORT || 8081;
const contenttest = {
  html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer",
};

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "welcome to prdocution test" });
});

app.get("/send", async (req, res) => {
  const info = await Email.send("tayuhermon@gmail.com", contenttest, "test");
  console.log(info);
  res.send({ message: "message sent successfully" });
});

app.post("/telegram-webhook/" + token, setWebHook);

app.listen(port, () => console.log(`server running on port ${port}`));

module.exports = app;

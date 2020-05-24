require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

port = process.env.PORT || 8082;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "welcome to prdocution test" });
});

app.listen(port, () => console.log(`server running on port ${port}`));

module.exports = app;

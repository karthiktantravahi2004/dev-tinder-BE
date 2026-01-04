const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("kill bill");
});

app.use("/test", (req, res) => {
  res.send("hello");
});

app.listen(3001, () => {
  console.log("server port number 3000 Running......");
});

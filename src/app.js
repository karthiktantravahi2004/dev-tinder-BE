const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("handler 1");

    next();
  },
  (req, res, next) => {
    console.log("handler 1");

    next();
  },
  (req, res, next) => {
    console.log("handler 2");

    next();
  },
  (req, res, next) => {
    console.log("handler 4");

    next();
  },
  (req, res, next) => {
    console.log("handler 5");

    next();
  },
  (req, res, next) => {
    console.log("handler 6");

    next();
  },
  (req, res) => {
    console.log("handler 7");
    res.send("response!!");
  }
);

app.listen(3001, () => {
  console.log("server port number 3000 Running......");
});

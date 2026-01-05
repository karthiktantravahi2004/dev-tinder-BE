const express = require("express");

const connectDB = require("./config/database");

const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const USerObj = {
    firstName: "kalyan",
    lastName: "Tantravahi",
    email: "kalyan@gmail.com",
    password: "kalyan2000",
  };
  // Creating a new instance of the user Model
  const user = new User(USerObj);

  try {
    await user.save();

    res.send("User added Succesfully");
  } catch (err) {
    res.status(400).send("Error saving the data Error:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Succesfully Established");
    app.listen(3001, () => {
      console.log("server port number 3001 Running......");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });

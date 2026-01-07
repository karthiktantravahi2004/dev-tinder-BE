require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added Succesfully");
  } catch (err) {
    res
      .status(400)
      .send("Error saving the data Error: " + err.message + "OOOOPS");
  }
});

app.get("/user", async (req, res) => {
  const userFirstName = req.query.firstName;

  try {
    const user = await User.find({ firstName: userFirstName });
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Succesfully Established");
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server Running");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });

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
  const userEmail = req.query.eMailId;

  try {
    const user = await User.find({ eMailId: userEmail });

    if (user.length === 0) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    //const user = await user.findByIdAndDelete({ userId: UserId });
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted Succesfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  //const userEmail = req.body.eMailId;
  const data = req.body;
  try {
    const user = await User.findOneAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("USer Updated Succesfully");
  } catch (err) {
    res.status(500).send("Update Failed " + err.message);
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

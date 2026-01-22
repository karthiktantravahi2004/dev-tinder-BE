require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bycrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //validate the data
    validateSignUpData(req);
    //encrypt the password
    const { firstName, lastName, eMailId, password } = req.body;

    const passwordHash = await bycrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      eMailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added Succesfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { eMailId, password } = req.body;

    const user = await User.findOne({ eMailId: eMailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bycrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login succesfull");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  //const userEmail = req.body.eMailId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "gender",
      "skills",
      "about",
      "password",
    ];

    const isAllowedUpdates = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isAllowedUpdates) {
      throw new Error("Update Not allowed");
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

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

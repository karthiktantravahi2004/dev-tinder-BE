const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://Karthik:karthik2004@cluster0.7zlvjkw.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

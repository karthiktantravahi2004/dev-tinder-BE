const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, eMailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not Valid!!");
  } else if (!validator.isEmail(eMailId)) {
    throw new Error("Email is not Valid!!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter a strong password");
  }
};

module.exports = {
  validateSignUpData,
};

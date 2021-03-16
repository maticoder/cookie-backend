const { validationResult } = require("express-validator");

module.exports.hello = (req, res) => {
  return res.json("hello");
};

module.exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  return res.status(200).json("token");
};

module.exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // validate input data

  // create the new user

  return res.status(201).json("User created");
};

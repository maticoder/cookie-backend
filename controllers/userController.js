const { validationResult } = require("express-validator");

module.exports.hello = (req, res) => {
  return res.json("hello");
};

module.exports.signup = (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  console.log(errors.isEmpty());
  console.log(errors.array());

  // validate input data

  // create the new user

  return res.json({
    name: "john",
    email: "john@email.com",
  });
};

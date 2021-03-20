const { validationResult } = require("express-validator");

module.exports.hello = (req, res) => {
  console.log(req.user);
  res.json("hello");
};

module.exports.progress = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid data",
      errors: errors.array(),
    });
  }

  return res.json("Good");
};

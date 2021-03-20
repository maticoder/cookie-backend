const { validationResult } = require("express-validator");
const Cookie = require("../models/Cookie");

module.exports.hello = (req, res) => {
  console.log(req.user);
  res.json("hello");
};

module.exports.progress = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid data",
      errors: errors.array(),
    });
  }

  const { id, counter } = req.body;

  try {
    await Cookie.updateOne(
      {
        userId: id,
      },
      {
        counter,
      }
    );

    return res.status(200).json({
      message: "Progress saved succesfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { createError } = require("../utils/error");

module.exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid data",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  // check if user exists
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json(
          createError(
            "Invalid data",
            "email",
            "User with given email does not exist"
          )
        );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json(
          createError("Invalid data", "password", "Password is not correct")
        );
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      message: "Login successfull",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.signup = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid data",
      errors: errors.array(),
    });
  }

  const { name, email, password } = req.body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create the new user
  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({
    message: "User created",
  });
};

const { body } = require("express-validator");
const User = require("../models/User");

const isEmpty = (value) =>
  value === undefined || value === null || value === "";

module.exports.validateSignin = () => {
  return [
    body("email")
      .custom((value) => !isEmpty(value))
      .withMessage("Email cannot be empty")
      .bail()
      .isEmail()
      .withMessage("Invalid email"),
    // .bail()
    // .custom((value) => {
    //   // check if email exists
    //   return true;
    // })
    // .withMessage("Given email doesn't exist"),
    body("password")
      .custom((value) => !isEmpty(value))
      .withMessage("Password cannot be empty"),
    // .bail()
    // .custom((value) => {
    //   return false;
    // })
    // .withMessage("Password is not correct"),
  ];
};

module.exports.validateSignup = () => {
  return [
    body("name")
      .custom((value) => !isEmpty(value))
      .withMessage("Name cannot be empty")
      .bail()
      .custom((value) => {
        if (value.length < 4) {
          return false;
        } else {
          return true;
        }
      })
      .withMessage("Name should be at least 4 characters logn"),
    body("email")
      .custom((value) => !isEmpty(value))
      .withMessage("Email cannot be empty")
      .bail()
      .isEmail()
      .withMessage("Invalid email")
      .bail()
      .custom(async (value) => {
        const exists = await User.exists({
          email: value,
        });
        if (exists) {
          return Promise.reject();
        }
      })
      .withMessage("User already exists"),
    body("password")
      .custom((value) => !isEmpty(value))
      .withMessage("Password cannot be empty")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters logn"),
    body("confirm")
      .custom((value) => !isEmpty(value))
      .withMessage("Confirm passowrd cannot be empty")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Confirm password must be at least 6 characters logn")
      .bail()
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords must match"),
  ];
};

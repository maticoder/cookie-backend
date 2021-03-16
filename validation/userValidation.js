const { body } = require("express-validator");

module.exports.validateSignup = () => {
  return [
    body("name")
      .exists()
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
      .exists()
      .withMessage("Email cannot be empty")
      .bail()
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .exists()
      .withMessage("Password cannot be empty")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters logn"),
    body("confirm")
      .exists()
      .withMessage("Confirm passowrd cannot be empty")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Confirm password must be at least 6 characters logn")
      .bail()
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords must match"),
  ];
};

module.exports.validateSignin = () => {
  return [
    body("email")
      .exists()
      .withMessage("Email cannot be empty")
      .bail()
      .isEmail()
      .withMessage("Invalid email")
      .bail()
      .custom((value) => {
        // check if email exists
        return true;
      })
      .withMessage("Given email doesn't exist"),
    body("password")
      .exists()
      .withMessage("password cannot be empty")
      .bail()
      .custom((value) => {
        return false;
      })
      .withMessage("Password is not correct"),
  ];
};

const { body } = require("express-validator");

module.exports.validateSignup = () => {
  return [
    body("name")
      .exists()
      .withMessage("Name cannot be empty")
      .bail()
      .custom((value) => {
        if (value.length < 6) {
          return Promise.reject();
        }
      })
      .withMessage("Name should be at least 6 characters length"),
    body("email")
      .exists()
      .withMessage("Email cannot be empty")
      .bail()
      .isEmail()
      .withMessage("Invalid email"),
  ];
};

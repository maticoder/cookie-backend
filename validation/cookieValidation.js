const { body } = require("express-validator");
const User = require("../models/User");
const { isEmpty } = require("../utils/validation");

module.exports.validateProgress = () => {
  return [
    body("id")
      .custom((value) => !isEmpty(value))
      .withMessage("Id cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Id has to be numeric"),
    // .custom(async (value) => {
    //   const exists = await User.exists({
    //     id: value,
    //   });
    //   console.log(exists);
    // })
    // .withMessage("User with given id does not exist"),
    body("counter")
      .custom((value) => !isEmpty(value))
      .withMessage("Counter cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Counter has to be numeric"),
  ];
};

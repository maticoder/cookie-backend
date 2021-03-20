const { body } = require("express-validator");
const User = require("../models/User");
const { isEmpty } = require("../utils/validation");

module.exports.validateProgress = () => {
  return [
    body("id")
      .custom((value) => !isEmpty(value))
      .withMessage("Id cannot be empty")
      .bail(),
    // .custom(async (value) => {
    //   try {
    //     const exists = await User.exists({
    //       _id: value,
    //     });
    //     if (!exists) {
    //       return Promise.reject();
    //     }
    //   } catch (err) {
    //     return Promise.reject();
    //   }
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

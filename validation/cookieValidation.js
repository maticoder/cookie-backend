const { body } = require("express-validator");
const User = require("../models/User");
const Cookie = require("../models/Cookie");
const Achievement = require("../models/Achievement");
const Item = require("../models/Item");
const { isEmpty } = require("../utils/validation");

module.exports.validateProgress = () => {
  return [
    body("counter")
      .custom((value) => !isEmpty(value))
      .withMessage("Counter cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Counter has to be numeric"),
  ];
};

module.exports.validateAchievement = () => {
  return [
    body("ids")
      .custom((value) => !isEmpty(value))
      .withMessage("Id cannot be empty")
      .bail()
      .custom(async (value) => {
        try {
          for (let v of value) {
            const exists = await Achievement.exists({
              _id: v,
            });
            if (!exists) {
              return Promise.reject();
            }
          }
        } catch (err) {
          return Promise.reject();
        }
      })
      .withMessage("Achievement with given id does not exist"),
    body("counter")
      .custom((value) => !isEmpty(value))
      .withMessage("Counter cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Counter has to be numeric"),
  ];
};

module.exports.validateItem = () => {
  return [
    body("id")
      .custom((value) => !isEmpty(value))
      .withMessage("Id cannot be empty")
      .bail()
      .custom(async (value) => {
        try {
          const exists = await Item.exists({
            _id: value,
          });
          if (!exists) {
            return Promise.reject();
          }
        } catch (err) {
          return Promise.reject();
        }
      })
      .withMessage("Item with given id does not exist")
      .bail()
      .custom(async (value, { req }) => {
        try {
          const item = await Item.findOne({
            _id: value,
          });
          if (item.prize > req.body.counter) {
            return Promise.reject();
          }
        } catch (err) {
          return Promise.reject();
        }
      })
      .withMessage("You cannot buy this item"),
    body("counter")
      .custom((value) => !isEmpty(value))
      .withMessage("Counter cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Counter has to be numeric"),
  ];
};

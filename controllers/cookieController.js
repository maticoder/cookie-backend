const { validationResult } = require("express-validator");
const User = require("../models/User");
const Cookie = require("../models/Cookie");
const Achievement = require("../models/Achievement");

module.exports.getUserData = async (req, res) => {
  // get user counter
  const { id } = req.user;

  const userData = await Cookie.findOne({
    userId: id,
  });

  return res.json(userData);
};

module.exports.getAchievements = async (req, res) => {
  const achievements = await Achievement.find({});
  return res.json(achievements);
};

module.exports.saveProgress = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid data",
      errors: errors.array(),
    });
  }

  const { id, counter, achievements } = req.body;

  try {
    await Cookie.updateOne(
      {
        userId: id,
      },
      {
        counter,
        $addToSet: { achievements },
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

module.exports.saveAchievement = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid data",
      errors: errors.array(),
    });
  }

  try {
    await Cookie.updateOne(
      {
        userId: req.user.id,
      },
      {
        counter: req.body.counter,
        $addToSet: { achievements: req.body.ids },
      }
    );

    return res.status(200).json({
      message: "Achievement unlocked",
    });
  } catch (error) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

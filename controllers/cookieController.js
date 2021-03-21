const { validationResult } = require("express-validator");
const User = require("../models/User");
const Cookie = require("../models/Cookie");
const Achievement = require("../models/Achievement");
const Item = require("../models/Item");

module.exports.getUserData = async (req, res) => {
  // get user counter
  const { id } = req.user;

  const userData = await Cookie.findOne({
    userId: id,
  });

  // await Item.create({
  //   value: 1,
  //   type: "click_multiplier",
  //   name: "Click multiplier",
  //   description: "Click 1 time faster",
  //   prize: 0,
  // });

  // await Item.create({
  //   value: 2,
  //   type: "click_multiplier",
  //   name: "Click multiplier",
  //   description: "Click 2 times faster",
  //   prize: 1000,
  // });

  // await Item.create({
  //   value: 4,
  //   type: "click_multiplier",
  //   name: "Click multiplier",
  //   description: "Click 4 times faster",
  //   prize: 2000,
  // });

  // await Item.create({
  //   value: 8,
  //   type: "click_multiplier",
  //   name: "Click multiplier",
  //   description: "Click 8 times faster",
  //   prize: 4000,
  // });

  // await Item.create({
  //   value: 16,
  //   type: "click_multiplier",
  //   name: "Click multiplier",
  //   description: "Click 16 times faster",
  //   prize: 8000,
  // });

  // await Item.create({
  //   value: 32,
  //   type: "click_multiplier",
  //   name: "Click multiplier",
  //   description: "Click 32 times faster",
  //   prize: 16000,
  // });

  // await Item.create({
  //   value: 64,
  //   type: "click_multiplier",
  //   name: "Click multiplier",
  //   description: "Click 64 times faster",
  //   prize: 32000,
  // });

  // await Item.create({
  //   value: 128,
  //   type: "click_multiplier",
  //   name: "Click multiplier",
  //   description: "Click 128 times faster",
  //   prize: 64000,
  // });

  // await Item.create({
  //   value: 256,
  //   type: "click_multiplier",
  //   name: "Click multiplier",
  //   description: "Click 256 times faster",
  //   prize: 128000,
  // });

  // await Item.create({
  //   value: 512,
  //   type: "click_multiplier",
  //   name: "Click multiplier",
  //   description: "Click 512 times faster",
  //   prize: 256000,
  // });

  // await Item.create({
  //   value: 1024,
  //   type: "click_multiplier",
  //   name: "Click multiplier",
  //   description: "Click 1024 times faster",
  //   prize: 512000,
  // });

  // await Item.create({
  //   value: 2048,
  //   type: "click_multiplier",
  //   name: "Click multiplier",
  //   description: "Click 2048 times faster",
  //   prize: 1024000,
  // });

  return res.json(userData);
};

module.exports.getAchievements = async (req, res) => {
  const achievements = await Achievement.find({});
  return res.json(achievements);
};

module.exports.getItems = async (req, res) => {
  const items = await Item.find({});
  return res.json(items);
};

module.exports.saveProgress = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid data",
      errors: errors.array(),
    });
  }

  const { counter } = req.body;

  try {
    await Cookie.updateOne(
      {
        userId: req.user.id,
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
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.saveItem = async (req, res) => {
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
        item: req.body.id,
      }
    );

    return res.status(200).json({
      message: "Item changed",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

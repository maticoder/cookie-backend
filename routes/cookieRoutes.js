const router = require("express").Router();
const auth = require("../auth/auth");
const {
  saveProgress,
  saveAchievement,
  saveItem,
  getUserData,
  getAchievements,
  getItems,
} = require("../controllers/cookieController");
const {
  validateProgress,
  validateAchievement,
  validateItem,
} = require("../validation/cookieValidation");

router.get("/data", auth, getUserData);
router.get("/achievements", auth, getAchievements);
router.get("/items", auth, getItems);
router.post("/achievement", auth, validateAchievement(), saveAchievement);
router.post("/item", auth, validateItem(), saveItem);
router.patch("/progress", auth, validateProgress(), saveProgress);

module.exports = router;

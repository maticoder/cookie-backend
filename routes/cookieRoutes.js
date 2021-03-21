const router = require("express").Router();
const auth = require("../auth/auth");
const {
  saveProgress,
  saveAchievement,
  getUserData,
  getAchievements,
} = require("../controllers/cookieController");
const {
  validateProgress,
  validateAchievement,
} = require("../validation/cookieValidation");

router.get("/data", auth, getUserData);
router.get("/achievements", auth, getAchievements);
router.post("/achievement", auth, validateAchievement(), saveAchievement);
router.patch("/progress", auth, validateProgress(), saveProgress);

module.exports = router;

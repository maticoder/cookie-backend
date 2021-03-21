const router = require("express").Router();
const { signin, signup } = require("../controllers/userController");
const {
  validateSignup,
  validateSignin,
} = require("../validation/userValidation");

router.post("/signin", validateSignin(), signin);
router.post("/signup", validateSignup(), signup);

module.exports = router;

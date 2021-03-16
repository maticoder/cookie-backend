const router = require("express").Router();
const { body } = require("express-validator");
const { hello, signin, signup } = require("../controllers/userController");
const {
  validateSignup,
  validateSignin,
} = require("../validation/userValidation");

router.get("/hello", hello);
router.post("/signin", validateSignin(), signin);
router.post("/signup", validateSignup(), signup);

module.exports = router;

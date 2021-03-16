const router = require("express").Router();
const { body } = require("express-validator");
const { hello, signup } = require("../controllers/userController");
const { validateSignup } = require("../validation/userValidation");

router.get("/hello", hello);
router.post("/signup", validateSignup(), signup);

module.exports = router;

const router = require("express").Router();
const auth = require("../auth/auth");
const { hello } = require("../controllers/cookieController");

router.get("/hello", auth, hello);

module.exports = router;

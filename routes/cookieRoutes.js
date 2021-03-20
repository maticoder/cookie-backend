const router = require("express").Router();
const auth = require("../auth/auth");
const { hello, progress } = require("../controllers/cookieController");
const { validateProgress } = require("../validation/cookieValidation");

router.get("/hello", auth, hello);
router.patch("/progress", auth, validateProgress(), progress);

module.exports = router;

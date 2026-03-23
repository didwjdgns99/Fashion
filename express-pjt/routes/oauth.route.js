const router = require("express").Router();
const {
  googleOAuthStart,
  googleOAuthCallback,
} = require("../controller/oauth.controller");

router.get("/google", googleOAuthStart);
router.get("/google/callback", googleOAuthCallback);

module.exports = router;

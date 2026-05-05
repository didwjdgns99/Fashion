const router = require("express").Router();
const {
  googleOAuthStart,
  googleOAuthCallback,
  googleLogoutController,
} = require("../controller/oauth.controller");

router.get("/google", googleOAuthStart);
router.get("/google/callback", googleOAuthCallback);
router.post("/logout", googleLogoutController);
module.exports = router;

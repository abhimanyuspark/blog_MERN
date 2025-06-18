const express = require("express");
const router = express.Router();
const {
  signUp,
  logIn,
  logOut,
  updateProfile,
  checkAuth,
} = require("../controllers/auth_controller");
const protectedRoute = require("../middlewares/protectedRoute");

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);

router.post("/profile", protectedRoute, updateProfile);
router.get("/check", protectedRoute, checkAuth);

module.exports = router;

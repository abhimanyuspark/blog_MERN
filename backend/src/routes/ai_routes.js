const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/protectedRoute");
const { generateText } = require("../controllers/ai_controller");

router.get("/test", protectedRoute, generateText);

module.exports = router;

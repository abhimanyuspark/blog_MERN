const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/protectedRoute");
const admin = require("../middlewares/adminOnly");
const { getDashBoardSummery } = require("../controllers/dashboard_controller");

router.get("/", protectedRoute, admin, getDashBoardSummery);

module.exports = router;

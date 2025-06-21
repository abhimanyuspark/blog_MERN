const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
} = require("../controllers/user_controller");
const protectedRoute = require("../middlewares/protectedRoute");

router.get("/", protectedRoute, getAllUsers);
router.get("/:id", protectedRoute, getUser);
router.put("/:id", protectedRoute, updateUser);
router.delete("/:id", protectedRoute, deleteUser);

module.exports = router;

const router = require("express").Router();
const {
  registerUser,
  authenticateUser,
  getUserProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/auth", authenticateUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
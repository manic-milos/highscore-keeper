const router = require("express").Router();
const {
  getAllHighscores,
  createHighscore,
} = require("../controllers/highscoreController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:gameId", getAllHighscores);
router.post("/:gameId", protect, createHighscore);

module.exports = router;

const {
  getAllGames,
  getGameInfo,
  createGame,
} = require("../controllers/gameController");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/", getAllGames);
router.post("/", protect, createGame);
router.get("/:id", getGameInfo);

module.exports = router;

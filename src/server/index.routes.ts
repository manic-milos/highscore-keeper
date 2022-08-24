{
  const router = require("express").Router();

  router.use("/user", require("./routes/userRoutes"));
  router.use("/game", require("./routes/gameRoutes"));
  router.use("/highscore", require("./routes/highscoreRoutes"));

  router.use("/version", (_, res) => {
    return res.json({ version: "1.0.0" });
  });

  module.exports = router;
}

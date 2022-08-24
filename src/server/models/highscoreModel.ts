{
  const mongoose = require("mongoose");

  const highscoreSchema = new mongoose.Schema(
    {
      score: {
        type: Number,
        required: [true, "score is required"],
      },
      game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: [true, "game is required"],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user is required"],
      },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Highscore", highscoreSchema);
}

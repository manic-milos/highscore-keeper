{
  const mongoose = require("mongoose");

  const gameSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "name is required"],
      },
      description: {
        type: String,
        required: [true, "description is required"],
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "owner is required"],
      },
      maxScore: {
        type: Number,
        default: Infinity,
      },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Game", gameSchema);
}

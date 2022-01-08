const mongoose = require("mongoose");

const ServerSchema = new mongoose.Schema(
  {
    servidor: {
      type: String
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      require: true

    },

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Servidor", ServerSchema);
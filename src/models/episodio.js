const mongoose = require("mongoose");

const EpisodioSchema = new mongoose.Schema(
    {
        titulo: {
            type: String
        },
        url: {
            type: String
        },
        temporada: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Temporada',
            require: true

        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Episodio", EpisodioSchema);
const mongoose = require("mongoose");

const TemporadaSchema = new mongoose.Schema(
    {
        titulo: {
            type: String
        },
        serie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Serie',
            require: true

        },
        episodios: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Episodio'
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Temporada", TemporadaSchema);
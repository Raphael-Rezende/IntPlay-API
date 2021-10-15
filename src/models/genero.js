const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema(
    {
        genero: {
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

module.exports = mongoose.model("Genero", GenreSchema);
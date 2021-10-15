const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
    {
        titulo: {
            type: String
        },
        genero: {
            type: String
        },
        capa: {
            type: String
        },
        lingua: {
            type: String
        },
        sinopse: {
            type: String
        },
        ano: {
            type: String
        },
        temporadas:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Temporada'
          }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Movie", MovieSchema);
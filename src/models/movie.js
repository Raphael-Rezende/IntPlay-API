const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
    {
        titulo: {
            type: String
        },
        capa: {
            type: String
        },
        backdrop: {
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
        url: {
            type: String
        },
        duracao: {
            type: String
        },
        size: {
            type: String
        },
        classificacao: {
            type: String
        },
        servidor: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Servidor'
        }],
        generos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genero'
        }]

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Movie", MovieSchema);
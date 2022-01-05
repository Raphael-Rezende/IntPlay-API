const Genero = require("../models/genero");

class GeneroController {

    async include(req, res) {

        try {



            const { genero } = req.body
            const generoDataBase = await Genero.findOne({ genero })
            console.log(genero, generoDataBase)
            if (generoDataBase != null) {

                if (generoDataBase.genero != genero) {
                    const data = await Genero.create({ genero });
                    return res.json(data);
                }
            } else {
                const data = await Genero.create({ genero });
                return res.json(data);
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    async indexAll(req, res) {

        try {

            const generos = await Genero.find();


            return res.json(generos);
        }
        catch (err) {

            console.log(err)
        }
    }

    async findPopulate(req, res) {

        const { id } = req.params
        try {

            const genero = await Genero.findOne({ _id: id }).populate({
                path: 'movies',
                model: 'Movie'
            })

            return res.json(genero);
        }

        catch (err) {
            console.log(err)
        }
    }

}

module.exports = new GeneroController();
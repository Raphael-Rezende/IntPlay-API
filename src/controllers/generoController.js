const Genero = require("../models/genero");

class GeneroController {

    async include(req, res) {

        try {



            const { genero } = req.body

            if (await Genero.findOne({ genero })) {

                console.log('Genero Existente')


            }
            const data = await Genero.create(req.body);

            return res.json(data);
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
            throw createError(err.status, { errors })
        }
    }

}

module.exports = new GeneroController();
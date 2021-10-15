const Movie = require("../models/movie");


class MovieController {

  async include(req, res) {

    try {


      const capa = req.files.capa[0].path
      const backdrop = req.files.backdrop[0].path
      const url = req.files.movie[0].path
      const movie = await Movie.create({ capa: capa, backdrop: backdrop, url: url});
      
      console.log(movie)
      return res.json(movie);
    }
    catch (err) {
      console.log(err)
    }
  }
  async includeRegister(req, res) {
    try {


    }
    catch (err) {
      console.log(err)
    }
  }

  async indexAll(req, res) {

    try {

      const movie = await Movie.find({ deleted: false });


      return res.json(movie);
    }
    catch (err) {

      console.log(err)
    }
  }
  async find(req, res) {
    const { id } = req.params;
    const errors = translateJson.duvidas.find;

    try {

      const duvida = await Duvida.findById(id);

      return res.json(duvida);
    }
    catch (err) {
      throw createError(err.status, { errors })
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { lang } = req.params;
    const errors = translateJson.duvidas.update;
    try {
      const duvida = await Duvida.findByIdAndUpdate(id, { ...req.body }, { new: true });
      const dataUpdate = Date.now();
      if (duvida) {
        AtualizacaoController.includeInternal('duvidas', duvida.lingua, dataUpdate)
      }

      return res.json(duvida);
    }
    catch (err) {
      throw createError(err.status, { errors })
    }
  }

  async deleted(req, res) {
    const errors = translateJson.duvidas.delete;
    const { id } = req.params;

    try {
      const duvida = await Duvida.findByIdAndUpdate(id, { deleted: true });

      return res.json(duvida);
    }
    catch (err) {
      console.log(err)
      throw createError(err.status, { errors })
    }
  }

  async delete(req, res) {
    const errors = translateJson.duvidas.delete;
    const { id } = req.params;

    try {
      const duvida = await Duvida.findByIdAndRemove(id);
      return res.json(duvida);
    }
    catch (err) {
      throw createError(err.status, { errors })
    }
  }

}

module.exports = new MovieController();
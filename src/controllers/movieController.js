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
}

module.exports = new MovieController();
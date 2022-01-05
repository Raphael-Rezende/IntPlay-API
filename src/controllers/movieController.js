const Movie = require("../models/movie");


class MovieController {

  async includeFiles(req, res) {

    try {

      console.log(req.files)
      var url = ''

      if (req.files.capa) {
        url = req.files.capa[0].path
      } else if (req.files.backdrop) {
        url = req.files.backdrop[0].path
      } else if (req.files.movie) {
        url = req.files.movie[0].path
      }


      return res.json(url);
    }
    catch (err) {
      console.log(err)
    }
  }
  async include(req, res) {

    try {
      console.log(req.body)
      const movie = await Movie.create({ ...req.body });

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

  async newsMovie(req, res) {
    try {
      const d = new Date()
      d.setDate(d.getDate() - 30);
      const movie = await Movie.find({ deleted: false, updatedAt: { $gt: (d) } })
        .populate({ path: 'generos', model: 'Genero' })


      return res.json(movie);
    }
    catch (err) {

      console.log(err)
    }

  }
}

module.exports = new MovieController();
const Movie = require("../models/movie");
const path = require("path");
var fs = require("fs")


class MovieController {

  async includeFiles(req, res) {

    try {

      var url = ''

      if (req.files.capa) {
        const capa = req.files.capa[0].path
        url = '\\tmp\\' + capa.split('\\tmp\\').pop()
      } else if (req.files.backdrop) {
        const backdrop = req.files.backdrop[0].path
        url = '\\tmp\\' + backdrop.split('\\tmp\\').pop()
      } else if (req.files.movie) {
        const movie = req.files.movie[0].path
        url = '\\tmp\\' + movie.split('\\tmp\\').pop()
      }



      return res.json(url);
    }
    catch (err) {
      console.log(err)
    }
  }
  async include(req, res) {

    try {
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

  async findId(req, res) {
    try {
      console.log('findId', req.params)
      const { id } = req.params
      const movie = await Movie.findOne({ _id: id });


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
  async deleteFile(req, res) {

    try {

      const { name, paste } = req.params;
      fs.unlinkSync(path.resolve(__dirname, "..", "..", "tmp", "uploads", paste, name))

      console.log(name)

      return res.json("Removed File");
    }
    catch (err) {

      console.log(err)
    }

  }
}

module.exports = new MovieController();
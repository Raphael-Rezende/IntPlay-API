const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const asyncHandler = require('express-async-handler')

const MovieController = require("./controllers/movieController");
const GeneroController = require("./controllers/generoController")
const servidorController = require("./controllers/servidorController")

routes.get("/", function (req, res) {
  //https.get(process.env.AWS_URL + 'site/index.html', function (response) {
  res.end("serividor rodando")
  //});

});

// Rotas CRUD Filmes
routes.post("/movie/incluirFiles", multer(multerConfig).fields([{
  name: 'capa', maxCount: 1
}, {
  name: 'backdrop', maxCount: 1
},
{
  name: 'movie', maxCount: 1
}]), asyncHandler(MovieController.includeFiles));

routes.get("/getall/:text", asyncHandler(MovieController.getAll))

routes.get("/recente/movie", asyncHandler(MovieController.newsMovie))
routes.get("/movie/:id", asyncHandler(MovieController.findId))
//routes.get("/movie/:id", asyncHandler(MovieController.find))
routes.get("/genero/movie/:genero", asyncHandler(MovieController.findByGenero))

routes.post("/movie/incluir/", asyncHandler(MovieController.include));
routes.get("/movies", asyncHandler(MovieController.indexAll))
routes.delete("/movie/deleteFile/:paste/:name", asyncHandler(MovieController.deleteFile));

routes.get("/generos/populate/:id", asyncHandler(GeneroController.findPopulate));
routes.get("/generos", asyncHandler(GeneroController.indexAll))
routes.post("/generos/incluir", asyncHandler(GeneroController.include))

routes.get("/servers", asyncHandler(servidorController.indexAll))
routes.post("/servers/incluir", asyncHandler(servidorController.include))
/*
routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url
  });

  return res.json(post);
});

routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  await post.remove();

  return res.send();
});
*/
module.exports = routes;
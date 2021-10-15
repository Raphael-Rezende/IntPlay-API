const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const asyncHandler = require('express-async-handler')

const MovieController = require("./controllers/movieController");
const GeneroController = require("./controllers/generoController")

routes.get("/", function (req, res) {
  //https.get(process.env.AWS_URL + 'site/index.html', function (response) {
  res.end("serividor rodando")
  //});

});

// Rotas CRUD Filmes
routes.post("/movie/incluir", multer(multerConfig).fields([{
  name: 'capa', maxCount: 1
}, {
  name: 'backdrop', maxCount: 1
},
{
  name: 'movie', maxCount: 1
}]), asyncHandler(MovieController.include));
routes.get("/movie/incluir/:id", asyncHandler(MovieController.includeRegister));
routes.get("/movies", asyncHandler(MovieController.indexAll))

routes.get("/generos/populate/:id", asyncHandler(GeneroController.findPopulate));
routes.get("/generos", asyncHandler(GeneroController.indexAll))
routes.post("/generos/incluir", asyncHandler(GeneroController.include))
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
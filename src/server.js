
const express = require("express");
const dotenv = require('dotenv').config()

const db = require("./database/config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

const morgan = require("morgan");
const path = require("path");


class App {
  constructor() {

    this.express = express();

    this.middlewares();
    this.database();

    this.express.listen(process.env.PORT || 3006).timeout = 120000;

  }

  database() {
    mongoose.connect('mongodb://localhost:27017/web-app', { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = mongoose.connection;

    connection.once("open", function () {
      console.log("MongoDB database connection established successfully");
    });
  }

  middlewares() {
    this.express.use(cors())
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(morgan("dev"));
    this.express.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );

    this.express.use(require("./routes"));

    // Fazendo o log do erro
    /*
    this.express.use((error, req, res, next) => {
      // Verifica se tem erro não tratado
      if (error && error.status) {
        console.log('erro tratado')
        res.status(error.status).json({
          status: error.status,
          message: error.errors,
          lang: translateJson.status[error.status]
        })
        console.log(error);
      } else {
        // Erro não tratado
        console.log('nao tratado');
        res.status(500).json({
          status: 500,
          message: translateJson.status[500],
          lang: {}
 
        })
        console.log(error);
      }
      // next();
 
 
    })*/
  }

}
module.exports = new App().express;
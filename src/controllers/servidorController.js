const Server = require("../models/servidor");

class GeneroController {

  async include(req, res) {

    try {



      const { servidor } = req.body
      const serverDataBase = await Server.findOne({ servidor })
      console.log(servidor, serverDataBase)
      if (serverDataBase != null) {

        if (serverDataBase.servidor != servidor) {
          const data = await Server.create({ servidor });
          return res.json(data);
        } else {
          return res.json("Existe");
        }
      } else {
        const data = await Server.create({ servidor });
        return res.json(data);
      }

    }
    catch (err) {
      console.log(err)
    }
  }
  async indexAll(req, res) {

    try {

      const server = await Server.find();


      return res.json(server);
    }
    catch (err) {

      console.log(err)
    }
  }



}

module.exports = new GeneroController();
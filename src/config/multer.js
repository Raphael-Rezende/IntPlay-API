const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
var fs = require("fs")

function checkFileExistsSync(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.constants.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}
module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multer.diskStorage({

    destination: (req, file, cb) => {
      if (file.fieldname === 'capa') {
        var capaFile = path.resolve(__dirname, "..", "..", "tmp", "uploads", "capa")
        if (checkFileExistsSync(capaFile)) {
          cb(null, capaFile);
          console.log("Arquivo existe!");
        } else {
          
          fs.mkdir(capaFile, { recursive: true }, (err) => {
            if (err) {
              console.log('Erro ao criar Diretório', err)
            }
            cb(null, capaFile);
          });
        }

      } else if (file.fieldname === 'backdrop') {
        var File = path.resolve(__dirname, "..", "..", "tmp", "uploads", "backdrop")
        if (checkFileExistsSync(capaFile)) {
          cb(null, File);
          console.log("Arquivo existe!");
        } else {
          
          fs.mkdir(File, { recursive: true }, (err) => {
            if (err) {
              console.log('Erro ao criar Diretório', err)
            }
            cb(null, File);
          });
        }

      } else if (file.fieldname === 'movie') {
        var File =  path.resolve(__dirname, "..", "..", "tmp", "uploads", "movie")
        if (checkFileExistsSync(capaFile)) {
          cb(null, File);
          console.log("Arquivo existe!");
        } else {
          
          fs.mkdir(File, { recursive: true }, (err) => {
            if (err) {
              console.log('Erro ao criar Diretório', err)
            }
            cb(null, File);
          });
        }
      }
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      'video/x-matroska'

    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.log(file)
      cb(new Error("Invalid file type."));
    }
  }
};
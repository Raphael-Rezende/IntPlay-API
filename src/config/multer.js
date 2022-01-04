const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multer.diskStorage({

    destination: (req, file, cb) => {
      if (file.fieldname === 'capa') {

        cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads", "capa"));

      } else if (file.fieldname === 'backdrop') {
        cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads", "backdrop"));

      } else if (file.fieldname === 'movie') {
        cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads", "movie"));
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
      "video/mkv"

    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.log(file)
      cb(new Error("Invalid file type."));
    }
  }
};
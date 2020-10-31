var Tesseract = require("tesseract.js");

var express = require("express");
var router = express.Router();
var path = require("path");

var multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, res, cb) => {
    cb(null, res.originalname);
  },
});
var upload = multer({ storage: storage });

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/detect", upload.single("avatar"), function (req, res, next) {
  const image = path.resolve(__dirname, "../" + req.file.path);
  console.log(req.file);
  console.log(image);
  try {
    Tesseract.recognize(image, `eng`, {
      logger: (m) => console.log(m),
      tessjs_create_pdf: "1",
    }).then(({ data: { text } }) => {
      console.log(text);
      res.send({ result: text });
    });
  } catch (error) {
    res.send({ result: error });
  }
});

module.exports = router;

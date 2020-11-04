var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var Tesseract = require("tesseract.js");

var multer = require("multer");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('prerender-node'));
app.use(express.static(__dirname + "/"));
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, res, cb) => {
    cb(null, res.originalname);
  },
});
var upload = multer({ storage: storage });

app.get("/", async function (req, res, next) {
  res.render("index", { title: "Express" });
});

app.post("/detect", upload.single("avatar"), function (req, res, next) {
  const image = path.resolve(__dirname, "./" + req.file.path);
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

app.listen(process.env.PORT || 5000);

var express = require('express')
var path = require('path')
var cookieParser = require("cookie-parser");

var indexRouter = require("./routes/index");

var app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use("/", indexRouter);

app.get('/', async (req, res) => {
  res.render('index')
})

app.listen(process.env.PORT || 5000);
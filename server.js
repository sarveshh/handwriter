const express = require('express')
var path = require('path')
const app = express()
app.use(express.static(__dirname + '/'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', async (req, res) => {
  res.render('index')
})

app.listen(process.env.PORT || 5000);
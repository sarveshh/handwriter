var Tesseract= require('tesseract.js');

var express = require('express');
var router = express.Router();
var path = require('path');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  
  router.post('/detect', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const image = path.resolve(__dirname,"../"+ req.file.path);
    console.log(req.file);
    console.log(image);
    try {
      Tesseract.recognize(image, `eng`, { logger: m => console.log(m) })
          .then(({ data: { text } }) => {
            console.log(text);
            res.send({result:text});
          });  
    } catch (error) {
      res.send({result:error});
    }
    
  })
  
  module.exports = router;
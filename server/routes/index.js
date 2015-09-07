var express = require('express');
var router = express.Router();
var crud = require("../logic/crud.js");


router.get('/user', function(req, res, next) {
  // test = new Question();
  // test.getTranslation("hello");
  res.render('index', { title: 'Node-Translate' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node-Translate' });
});

router.post('/user', function(req, res, next) {
  var response = crud.handlePost(req.body.name);
  res.json(response);
});

router.put('/user', function(req, res, next) {
  res.render('index', { title: 'Node-Translate' });
});

// word library
router.get('/wordlibrary', function(req, res, next) {
  res.render('index', { title: 'Node-Translate' });
});

router.post('/wordlibrary', function(req, res, next) {
  res.render('index', { title: 'Node-Translate' });
});




module.exports = router;

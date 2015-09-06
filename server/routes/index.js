var express = require('express');
var router = express.Router();
// var Question = require("../utilities/question");


router.get('/user', function(req, res, next) {
  // test = new Question();
  // test.getTranslation("hello");
  res.render('index', { title: 'Node-Translate' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node-Translate' });
});

router.post('/user', function(req, res, next) {
  res.render('index', { title: 'Node-Translate' });
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

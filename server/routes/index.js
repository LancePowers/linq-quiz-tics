var express = require('express');
var router = express.Router();
var crud = require("../logic/crud.js");
var bt = require("bing-translate").init({
  client_id: "Linquiztics",
  client_secret: process.env.KEY_1
});


router.get('/user', function(req, res, next) {
  crud.handleGet(function(data){
    res.json(data);
  })
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node-Translate' });
});

router.post('/user', function(req, res, next) {
  var response = crud.handlePost(req.body.name);
  res.json(response);
});

router.put('/user/:id', function(req, res, next) {
  crud.handlePut(req.params.id, req.body.quizzes, function(data){
    res.json(data);
  });
});

// word library
router.get('/wordlibrary', function(req, res, next) {
  res.render('index', { title: 'Node-Translate' });
});

router.post('/wordlibrary', function(req, res, next) {
  res.render('index', { title: 'Node-Translate' });
});


router.get('/user/:id', function(req, res, next) {
  crud.handleGetOne(req.params.id, function (data) {
    res.json(data);
  });
});

router.post('/translate', function(req, res, next) {
  var response;
  bt.translate(req.body.word, "en", "es", function(err, result){
    response = result.translated_text;
    res.json(response);
  });
});


module.exports = router;

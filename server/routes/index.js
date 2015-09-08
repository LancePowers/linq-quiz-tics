var express = require('express');
var router = express.Router();
var crud = require("../logic/crud.js");


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



module.exports = router;

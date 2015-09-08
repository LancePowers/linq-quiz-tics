var express = require('express');
var router = express.Router();
var crud = require("../logic/crud.js");

var bt = require('bing-translate').init({
  client_id: 'Linquiztics',
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
router.get("/translate", function(req, res, next){
var response;
  console.log("req!",req);
   bt.translate("hello","en","es",function(err, res){
    response =res.translated_text;
   console.log(res.translated_text);
  // console.log(res.translated_text);
  });
  console.log("response!", response);
  res.json(response);
});


router.get('/user/:id', function(req, res, next) {
  crud.handleGetOne(req.params.id, function (data) {
    res.json(data);
  });
});



module.exports = router;

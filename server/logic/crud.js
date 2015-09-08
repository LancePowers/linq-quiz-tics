var db = require("../database.js");

function handlePost(inputName){
  newUser = new db.User({name: inputName});
  newUser.save(function(err){
    if (err) return err;
  })
  return newUser;
}

function handleGet(cb){
  db.User.find({}, function(err, data){
    cb(data);
  });
}

function handleGetOne(id, cb) {
  db.User.find({_id: id}, function(err, data){
  console.log("in crud get");
    cb(data);
  });
}

module.exports = {
  handlePost: handlePost,
  handleGet: handleGet,
  handleGetOne: handleGetOne
}
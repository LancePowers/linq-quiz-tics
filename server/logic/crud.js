var db = require("../database.js");

function handlePost(inputName){
  newUser = new db.User({name: inputName});
  newUser.save(function(err){
    if (err) return err;
  })
  return newUser;
}

module.exports = {
  handlePost: handlePost
}
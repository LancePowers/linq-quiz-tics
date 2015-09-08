// constructor
function User(name){
  this.name = name;
  this.quizesPassed = 0;
  this.quizesFailed = 0;
  this.quizes = [];
}

User.prototype.getStats = function () {
  var stats = {
    passed: this.quizesPassed,
    sdHigh: null,
    qfHigh: null,
    tqHigh: null,
  }
  for (var i = 0; i < this.quizes.length; i++) {
    this.quizes[i]
    //if its this challenge & its higher than the current
  }
};

User.prototype.addQuiz = function(quiz){
  this.quizes.push(quiz);
};

User.prototype.updatePassFail = function () {
  for (var i = 0; i < this.quizes.length; i++) {
    if(this.quizes[i].isFailed){
      this.quizesFailed ++;
    } else if(this.quizes[i].isPassed){
      this.quizesPassed ++;
    }
  }
};

module.exports = User;

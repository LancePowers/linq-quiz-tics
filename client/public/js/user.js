// constructor
function User(name){
  this.name = name;
  this.quizzesPassed = 0;
  this.quizzesFailed = 0;
  this.quizzes = [];
}

User.prototype.getStats = function () {
  var stats = {
    passed: this.quizzesPassed,
    sdHigh: null,
    qfHigh: null,
    tqHigh: null,
  }
  for (var i = 0; i < this.quizzes.length; i++) {
    if(
      this.quizzes[i].type === "sudden-death" &&
      this.quizzes[i].score > stats.sdHigh.score
    ){
      stats.sdHigh = this.quizzes[i];
    }
    if(
      this.quizzes[i].type === "quick-fire" &&
      this.quizzes[i].score > stats.qfHigh.score
    ){
      stats.qfHigh = this.quizzes[i];
    }
    if(
      this.quizzes[i].type === "twenty-questions" &&
      this.quizzes[i].score > stats.tqHigh.score
    ){
      stats.tqHigh = this.quizzes[i];
    }
  }
  return stats;
};

User.prototype.addQuiz = function(quiz){
  this.quizzes.push(quiz);
};

User.prototype.updatePassFail = function () {
  for (var i = 0; i < this.quizzes.length; i++) {
    if(this.quizzes[i].isFailed){
      this.quizzesFailed ++;
    } else if(this.quizzes[i].isPassed){
      this.quizzesPassed ++;
    }
  }
};

module.exports = User;

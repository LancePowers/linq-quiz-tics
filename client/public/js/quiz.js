// constructor
function Quiz(language,type){
  this.languageChoice= language; // change to game.language
  this.questions = [];
  this.currentQuestion= 0;
  this.results = new Results(0, 0, 0, 0);
  this.type = type;
}

// Populates the questions array. Pass in number based upon quiz type.
Quiz.prototype.createQuestions = function (num) {
  var words = game.getWord(this.difficulty, true);
  this.results.questionsRemaining = num;
  for (var i = 0; i < num; i++) {
    var index = Math.floor(Math.random() * words.length);
    var word = words.splice(index, 1);
    this.questions.push(
      new Question(words)
    );
  }
};

// update results as quiz progresses
Quiz.prototype.updateResults= function(){
  // this takes care of questions answered and questions remaining
  for (var i = 0; i < this.questions.length; i++) {
    if (this.questions[i].userAnswer !== null ) {
      this.results.questionsAnswered ++;
      this.results.questionsRemaining --;
    }
    if (this.questions[i].isCorrect) {
      this.results.questionsCorrect ++;
    }
  }

};

//
Quiz.prototype.nextQuestion= function(){
  this.updateResults();
  this.checkFailQuiz();
  if(this.isDone){
    alert('challenge complete')// replace with results render
  } else {
    game.question = this.questions[this.results.questionsAnswered];
  }
};

// check to see end conditions for sudden death and 20Q. rapid fire is on timeout
Quiz.prototype.checkFailQuiz= function(){
  if(this.type === 'sudden-death'){
    if(!game.question.isCorrect){
      this.isDone = true;
    }
  } else if (this.type === 'twenty-questions'){
    if (this.results.questionsIncorrect >= 5 || this.results.questionsAnswered === 20) {
      this.isDone = true;
    }
  }
};

Quiz.prototype.checkPassQuiz = function () {
  if (this.results.questionsCorrect > 15 && this.results.questionsRemaining === 0){
    this.isPassed = true;
  }
};

// constructor for results
function Results(qA, qC, qI, qR){
  this.questionsAnswered = qA;
  this.questionsCorrect = qC;
  this.questionsIncorrect = qI;
  this.questionsRemaining = qR;
}

Quiz.prototype.createQuizElement = function(){
 debugger;
  var element =
    '<div class="container success"> \
        <div class="row"> \
            <div class="col-lg-6 text-center"> \
                <h2 id="'+game.quiz.type+'-word">Challenge</h2> \
                <hr class="star-light"> \
                <h2 id="'+game.quiz.type+'-translated-word"></h2> \
            </div> \
        </div> \
        <div class="row"> \
            <div class="col-lg-6"> \
                <form name="question" id="questionForm" novalidate> \
                    <div class="row control-group"> \
                        <div class=" white-background form-group col-xs-12 floating-label-form-group controls"> \
                            <label>Answer</label> \
                            <input type="text" class="form-control" placeholder="Click Start To Challenge" id="'+game.quiz.type+'-answer"> \
                            <p class="help-block text-danger"></p> \
                        </div> \
                    </div> \
                    <br> \
                    <div id="success"></div> \
                    <div class="row"> \
                        <div class="form-group col-xs-6"> \
                            <button id="'+game.quiz.type+'"class="btn btn-lg">Start</button> \
                        </div> \
                        <div class="from-group col-xs-6"> \
                          <select class="form-control" id="'+game.quiz.type+'-difficulty"> \
                            <option>Easy</option> \
                            <option>Medium</option> \
                            <option>Hard</option> \
                          </select> \
                        </div> \
                    </div> \
                </form> \
            </div> \
        </div> \
    </div>';
  return element;
}







module.exports = Quiz;

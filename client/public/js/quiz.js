// constructor
function Quiz(language,type){
  this.languageChoice= language; // change to game.language
  this.questions = [];
  this.currentQuestion= 0;
  this.results = new Results(0, 0, 0, 20);
  this.type = type;
}

// Populates the questions array. Pass in number based upon quiz type.
Quiz.prototype.createQuestions = function (num) {
  var words = game.getWord(this.difficulty, true);
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
      this.questionsCorrect ++;
    }
  }
    this.questionsIncorrect = this.questionsAnswered - this.questionsCorrect;
};

//
Quiz.prototype.nextQuestion= function(){
  this.updateResults();
  this.checkFailQuiz();
  this.currentQuestion ++;
  this.renderQuestion();
};

// if they miss 5 questions,
Quiz.prototype.checkFailQuiz= function(){
  if (this.results.questionsIncorrect >= 5) {
    this.renderFail();
    this.isFailed = true;
  }
};

Quiz.prototype.checkPassQuiz = function () {
  if (this.results.questionsCorrect > 15 && this.results.questionsRemaining === 0){
    this.isPassed = true;
  }
};

// give them the choice to start quiz again or go to practice.
Quiz.prototype.renderFail = function () {
    $('#start-screen').show();
    $('#message').html("Sorry, you f'ed up!");
};

Quiz.prototype.renderResults= function(){
    $('#questions-answered').html(this.results.questionsAnswered);
    $('#questions-correct').html(this.results.questionsCorrect);
    $('#questions-incorrect').html(this.results.questionsIncorrect);
    $('#questions-remaining').html(this.results.questionsRemaining);
};

Quiz.prototype.renderQuestion= function(){
    $('#question-word').html(this.questions[this.currentQuestion].word);
};

// constructor for results
function Results(qA, qC, qI, qR){
  this.questionsAnswered = qA;
  this.questionsCorrect = qC;
  this.questionsIncorrect = qI;
  this.questionsRemaining = qR;
  this.score = null;
}

Quiz.prototype.createQuizElement = function(){
console.log(this.type);
  var element =
    '<div class="container success"> \
        <div class="row"> \
            <div class="col-lg-6 text-center"> \
                <h2 id="'+this.type+'-word">Practice</h2> \
                <hr class="star-light"> \
                <h2 id="'+this.type+'-translated-word"></h2> \
            </div> \
        </div> \
        <div class="row"> \
            <div class="col-lg-6"> \
                <form name="question" id="questionForm" novalidate> \
                    <div class="row control-group"> \
                        <div class=" white-background form-group col-xs-12 floating-label-form-group controls"> \
                            <label>Answer</label> \
                            <input type="text" class="form-control" placeholder="Click Start To Practice" id="'+this.type+'-answer"> \
                            <p class="help-block text-danger"></p> \
                        </div> \
                    </div> \
                    <br> \
                    <div id="success"></div> \
                    <div class="row"> \
                        <div class="form-group col-xs-6"> \
                            <button name="'+this.type+'" type="submit" id="'+this.type+'" class="btn btn-lg">Start</button> \
                        </div> \
                        <div class="from-group col-xs-6"> \
                          <select class="form-control" id="'+this.type+'-difficulty"> \
                            <option>Easy</option> \
                            <option>Medium</option> \
                            <option>Hard</option> \
                          </select> \
                        </div> \
                    </div> \
                </form> \
            </div> \
        </div> \
    </div>'
  return element;
}
// it should stop the







module.exports = Quiz;

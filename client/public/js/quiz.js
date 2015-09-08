// constructor
function Quiz(type, difficulty){
  this.questions = [];
  this.currentQuestion= 0;
  this.results = new Results(0, 0, 0, 0);
  this.type = type;
  this.difficulty = null;
  this.score = 0;
}

// Populates the questions array. Pass in number based upon quiz type.
Quiz.prototype.createQuestions = function (num) {
  var words = game.getWord(this.difficulty, true);
  this.results.questionsRemaining = num;
  for (var i = 0; i < num; i++) {
    var index = Math.floor(Math.random() * words.length);
    var word = words.splice(index, 1);
    this.questions.push(
      new Question(word)
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
    } else {
      this.results.questionsIncorrect ++;
    }
  }

};

Quiz.prototype.startTimer = function () {
  // body...
};

//
Quiz.prototype.nextQuestion= function(){
  this.updateResults();
  this.checkFailQuiz();
  if(this.isDone){
    game.question = this.questions[this.results.questionsAnswered];
  }
};

// check to see end conditions for sudden death and 20Q. rapid fire is on timeout
Quiz.prototype.checkFailQuiz= function(){
  if(this.type === 'sudden-death'){
    if(!game.question.isCorrect){
      this.isDone = true;
      this.score = this.questionsAnswered;
      // save to database
    }
  } else if (this.type === 'twenty-questions'){
    if (this.results.questionsIncorrect >= 5 || this.results.questionsAnswered === 20) {
      this.isDone = true;
      this.score = this.results.questionsCorrect;
      // save to database
    }
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
  var element =
    '<div class="container success" style = "background-color: #18bc9c"> \
        <div class="row"> \
            <div class="col-lg-8 col-lg-offset-2 text-center"> \
                <h2 id="'+game.quiz.type+'-word">Challenge</h2> \
                <hr class="star-light"> \
                <h2 id="'+game.quiz.type+'-translated-word"></h2> \
            </div> \
        </div> \
        <div class="row"> \
            <div class="col-lg-8 col-lg-offset-2"> \
                <form name="question"id="'+game.quiz.type+'" class="challenge" > \
                    <div class="row control-group"> \
                        <div class=" white-background form-group col-xs-12 floating-label-form-group controls"> \
                            <label>Answer</label> \
                            <input type="text" class="form-control" placeholder="Choose Difficulty" id="'+game.quiz.type+'-answer"> \
                            <p class="help-block text-danger"></p> \
                        </div> \
                    </div> \
                    <br> \
                    <div id="success"></div> \
                    <div class="row"> \
                        <div class="form-group col-xs-6"> \
                            <button class="btn btn-lg" >Choose</button> \
                        </div> \
                        <div class="from-group col-xs-6"> \
                          <select class="form-control" id ="'+game.quiz.type+'-difficulty"> \
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
};
Quiz.prototype.getResultsElement = function() {
  var element =
  '<div class="container">\
    <div class="row">\
        <div class="col-md-12">\
            <div class="alert alert-info">\
                 Your score is ' + this.score +'</div>\
            <div class="alert alert-success" style="display:none;">\
                <span class="glyphicon glyphicon-ok"></span> Drag table row and cange Order</div>\
            <table class="table">\
                <thead>\
                    <tr>\
                        <th>\
                            Word\
                        </th>\
                        <th>\
                            Translated Word\
                        </th>\
                        <th>\
                            Your Answer\
                        </th>\
                    </tr>\
                </thead>\
                <tbody>'
                  + this.resultsTable() +
                '</tbody>\
            </table>\
        </div>\
    </div>\
</div>';
return element;
};

Quiz.prototype.resultsTable  =  function() {
  var resultsTable = "";
  for (i = 0; i < this.questions.length; i++) {
    var questionStatus = "";
    if (this.questions[i].isCorrect) {
      questionStatus = 'success';
    } else if (this.questions[i].userAnswer === null) {
      questionStatus = 'active';
    } else {
      questionStatus = 'danger';
    }
    var element =
    '<tr class="'+ questionStatus +'">\
      <td>'
          + this.questions[i].word +
      '</td>\
      <td>'
          + this.questions[i].translatedWord +
      '</td>\
      <td>'
          + this.questions[i].userAnswer +
      '</td>\
    </tr>';
    resultsTable += element;
  }
  return resultsTable;
};


// module.exports = Quiz;

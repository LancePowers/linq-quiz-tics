$(document).on('ready', function(){
  $('#start-modal').modal({
    backdrop:'static',
    keyboard:false,
    show:true
  });
});

// Button on login modal to setup session
$('#game-init-button').on('click', function () {
  game = new Game();
  game.question = new Question(game.getWord('Easy'));
});

// Practice button
$('#practice').on('click', function(event){
  event.preventDefault();
  var difficulty = $('#'+this.id+'-difficulty option:selected').html();
  if($(this).html()==='Start' || $(this).html()==='Next'){
    $(this).html('Answer');
    game.question = new Question(game.getWord(difficulty)[0]);
    game.question.show(this.id);
  }else if($(this).html()==='Answer'){
    $(this).html('Next');
    game.question.answer(this.id);
  }
});

// Sudden-death challenge init
$('#start-sudden-death').on('click', function(){
  event.preventDefault();
  game.quiz = new Quiz('sudden-death');
  $('#sudden-death-content').html(game.quiz.createQuizElement);//()?
});

$('#start-twenty-questions').on('click', function(){
  event.preventDefault();
  game.quiz = new Quiz('twenty-questions');
  $('#twenty-questions-content').html(game.quiz.createQuizElement);//()?
});

$('#start-rapid-fire').on('click', function(){
  event.preventDefault();
  game.quiz = new Quiz('rapid-fire');
  $('#rapid-fire-content').html(game.quiz.createQuizElement);//()?
});

$(document).on('submit', '.challenge', function(event){
  event.preventDefault();
  var button = '#'+this.id+' :button';
  var difficulty = $('#'+this.id+'-difficulty option:selected').html();
  console.log(difficulty);
  if($(button).html()==='Choose'){
    $(button).html('Answer');
    game.quiz.difficulty = difficulty;
    game.quiz.createQuestions(100);
    game.question = game.quiz.questions[0];
    game.question.show(this.id);
  }else if($(button).html()==='Next'){
    $(button).html('Answer');
    game.quiz.nextQuestion();
    game.question.show(this.id);
  }else if($(button).html()==='Answer'){
    $(button).html('Next');
    game.question.answer(this.id);
  }
});

// Twenty Questions Button

// Rapid Fire Button

$(document).on('ready', function(){
  $('#start-modal').modal({
   backdrop:'static',
   keyboard:false,
   show:true
 });
 checkForUsers();
})

// Button on login modal to setup session
$('#game-init-button').on('click', function () {
  game = new Game();
  game.init();
  game.setUser();
  game.question = new Question(game.getWord('Easy'));
})

// Practice button
$('#practice').on('click', function(event){
  event.preventDefault();
  console.log("in practice: "+game.user.name)
  var difficulty = $('#'+this.id+'-difficulty option:selected').html();
  if($(this).html()==='Start' || $(this).html()==='Next'){
    $(this).html('Answer');
    game.question = new Question(game.getWord(difficulty));
    game.question.show(this.id);
  }else if($(this).html()==='Answer'){
    $(this).html('Next');
    game.question.answer(this.id);
  }
})

// Sudden-death challenge init
$('#start-sudden-death').on('click', function(){
  event.preventDefault();
  game.quiz = new Quiz('sudden-death');
  $('#sudden-death-content').html(game.quiz.createQuizElement);
});

$('#start-twenty-questions').on('click', function(){
  event.preventDefault();
  game.quiz = new Quiz('twenty-questions');
  $('#twenty-questions-content').html(game.quiz.createQuizElement);
});

$('#start-rapid-fire').on('click', function(){
  event.preventDefault();
  game.quiz = new Quiz('rapid-fire');
  var timer = setTimeout(function(){startTimer(), 5 * 60 * 1000});
  $('#rapid-fire-content').html(game.quiz.createQuizElement);
})

$(document).on('submit', '.challenge', function(event){
  event.preventDefault();
  var button = '#'+this.id+' :button';
  var difficulty = $('#'+this.id+'-difficulty option:selected').html();
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
})


// populate modal with users from DB
var checkForUsers = function(){
  $.ajax({
    method: "GET",
    url: "/user"
  }).done(function(data){
    var select = $("#name-select")[0];
    var $select = $(select);
    for (var i = 0; i < data.length; i++) {
      $select.append("<option id='" + data[i]._id +"'>"+data[i].name+"</option>");
    };
  }).fail(function(err){
    console.log(err);
  });
};

// Twenty Questions Button

// Rapid Fire Button

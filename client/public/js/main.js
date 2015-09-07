$(document).on('ready', function(){
  $('#start-modal').modal({
   backdrop:'static',
   keyboard:false,
   show:true
 });
})

// Button on login modal to setup session
$('#game-init-button').on('click', function () {
  game = new Game();
  game.question = new Question(game.getWord('Easy'));

})

// Practice button
$('#practice').on('click', function(event){
  event.preventDefault();
  var difficulty = $('#'+this.id+'-difficulty option:selected').html();
  if($(this).html()==='Start'){
    game.question = new Question(game.getWord(difficulty));
  }else if($(this).html()==='Answer'){
    $(this).html('Answer');
    $(this).html('Submit');
    game.question.answer(event);
  } else {
    game.question = new Question(game.getWord(difficulty));
    $(this).html('Answer');
    game.question.show(event);
  }
})


$('#start-sudden-death').on('click', function(){
  game.quiz = new Quiz('english','sudden-death');
  $('#content').html(game.quiz.createQuizElement);
})
// Sudden Death Button
$('#sudden-death').on('click', function(event){
  event.preventDefault();
  var difficulty = $('#'+this.id+'-difficulty option:selected').html();
  if($(this).html()==='Start'){
    //create quiz object
    //add questions to it
  }else if($(this).html()==='Answer'){
    $(this).html('Submit');
    game.question.answer(event);
    //next question
  } else {
    game.question = new Question(game.getWord(difficulty));
    $(this).html('Answer');
    game.question.show(event);
    // show quiz score
  }
})

// Twenty Questions Button

// Rapid Fire Button

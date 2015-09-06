$(document).on('ready', function(){
  $('#start-modal').modal({
   backdrop:'static',
   keyboard:false,
   show:true
 });
})

$('#game-init-button').on('click', function () {
  game = new Game();
  game.question = new Question(game.getWord('Easy'));

})

$('#practice').on('click', function(event){
  event.preventDefault();
  console.log(game.question.word)
  // question
  if($(this).html()==='Answer'){
    $(this).html('Submit');
    game.question.answer(event);
  } else {
    //answer
    var difficulty = $('#'+this.id+'-difficulty option:selected').html();
    console.log(difficulty);
    game.question = new Question(game.getWord(difficulty));
    $(this).html('Answer');
    game.question.show(event);
  }
})

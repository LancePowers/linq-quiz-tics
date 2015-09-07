// var key1 = require('../../keys');
// var bt = require('bing-translate').init({
//   client_id: 'Linquiztics',
//   client_secret: key1
// });

// constructor
function Question(word){
  this.userAnswer = null;
  this.word = word;
  this.translatedWord = 'hola'; // substitute with ajax call
  this.isCorrect = null;
}


// Show's the word and any quiz specifics
Question.prototype.show = function(event) {
  var button = event.toElement;
  var challenge = $(button).attr('id');
  $('#'+challenge+'-word').html(this.word).css('color','#fff');
  $('#'+challenge+'-translated-word').html('Extra').css('color','#18bc9c');
};

// Show's the answer and whether or not it was correct
Question.prototype.answer = function (event) {
  var button = event.toElement;
  var challenge = $(button).attr('id');
  this.userAnswer = $('#'+challenge+'-answer').val();
  this.checkUserAnswer();
  if(!this.isCorrect){
    $('#'+challenge+'-word').html('Fail').css('color','#bd3e25');
  } else {
    $('#'+challenge+'-word').html('Correct!').css('color','#fff');
  }
  $('#'+challenge+'-translated-word').html(this.word+': Hola').css('color','#fff');
};

Question.prototype.getTranslation = function(word, langFrom,langTo ){
  bt.translate(word,langFrom,langTo, function(err, res){
    console.log(err, res);
    return res;
  });
};

Question.prototype.checkUserAnswer = function(){
  if (this.userAnswer === this.translatedWord){
    this.isCorrect = true;
  }
  else if (this.userAnswer.length === this.translatedWord.length){
    this.isCorrect = false;
  }
  else if (this.isAcceptable()){
    this.isCorrect = true;
  }
  else {
    this.isCorrect = false;
  }
};

Question.prototype.isAcceptable = function(){
  var count = 0;
  for (var i = 0; i < this.userAnswer.length; i++) {
    if (this.translatedWord[i] !== this.userAnswer[i]){
      count++;
    }
  }
  if (count > 1){
    return false;
  }
  else return true;
};

module.exports = Question;

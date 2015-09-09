// var key1 = require('../../keys');
// var bt = require('bing-translate').init({
//   client_id: 'Linquiztics',
//   client_secret: key1
// });

// constructor
function Question(word){
  var self = this;
  this.userAnswer = null;
  this.word = word;
  this.translatedWord = null;
  this.isCorrect = null;
  $.ajax({
    url: "/translate",
    method: 'POST',
    data: {
            word: word,
            langFrom:"en",
            langTo:"es"
          }
    }).done(function(response){
      self.translatedWord = response;
      console.log(response);
      console.log(self);
    }).fail(function(err){
      console.log(err);
    });
}


// Show's the word and any quiz specifics
Question.prototype.show = function(challenge) {
  $('#'+challenge+'-word').html(this.word).css('color','#fff');
  $('#'+challenge+'-translated-word').html('Extra').css('color','#18bc9c');
  $('#'+challenge+'-answer').attr('placeholder','Enter Answer');
};

// Show's the answer and whether or not it was correct
Question.prototype.answer = function (challenge) {
  this.userAnswer = $('#'+challenge+'-answer').val();
  $('#'+challenge+'-answer').val('');
  $('#'+challenge+'-answer').attr('placeholder','Click Next');
  this.checkUserAnswer();
  if(!this.isCorrect){
    $('#'+challenge+'-word').html('Fail').css('color','#bd3e25');
  } else {
    $('#'+challenge+'-word').html('Correct!').css('color','#fff');
  }
  $('#'+challenge+'-translated-word').html(this.word+': '+this.translatedWord).css('color','#fff');
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

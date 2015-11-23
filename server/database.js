var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var dotenv = require('dotenv');
dotenv.load();

var userSchema = new Schema(
  {
    name: String,
    quizzes: [{
        score: Number,
        type: String,
        languageChoice: String,
        currentQuestion: Number,
        isFailed: Boolean,
        isPassed: Boolean,
        results: {
          questionsAnswered: Number,
          questionsCorrect: Number,
          questionsIncorrect: Number,
          questionsRemaining: Number
        },
        questions: [{
          userAnswer: String,
          word: String,
          translatedWord: String,
          isCorrect: Boolean
        }],
      }],
    quizzesPassed: Number,
    quizzesFailed: Number
  }
);

var User = mongoose.model('users', userSchema);
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI);

module.exports = {
  User: User
};

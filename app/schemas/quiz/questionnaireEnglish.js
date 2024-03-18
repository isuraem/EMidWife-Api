// models/questionnaire.js
const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
  question: String,
  answers: [String],
  scores: [Number],
});


module.exports = mongoose.model('QuestionnaireInEnglish', questionnaireSchema);

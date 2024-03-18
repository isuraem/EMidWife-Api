// models/questionnaire.js
const mongoose = require('mongoose');

const quizScoreSchema = new mongoose.Schema({
  age: Number,
  depression_level: Number,
  previous_child_birth_experiences: Number,
  marital_status_divorced: Number,
  marital_status_married: Number,
  marital_status_single: Number,
  family_background_bad: Number,
  family_background_good: Number,
  family_background_normal: Number,
});

module.exports = mongoose.model('quizScore', quizScoreSchema);

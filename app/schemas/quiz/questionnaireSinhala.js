// models/questionnaire.js
const mongoose = require("mongoose");


const questionnaireSinhalaSchema = new mongoose.Schema({
	question: String,
	answers: [String],
	scores: [Number],
});

module.exports = mongoose.model(
	"QuestionnaireInSinhala",
	questionnaireSinhalaSchema,
);


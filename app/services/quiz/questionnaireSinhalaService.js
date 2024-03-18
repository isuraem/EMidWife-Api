// services/questionnaireService.js
const Questionnaire = require("../../schemas/quiz/questionnaireSinhala");

module.exports.addQuestionnaireService = async (req, res) => {
	try {
		const { question, answers, scores } = req; // Assuming the data is in the request body
		const response = await Questionnaire.create({
			question,
			answers,
			scores,
		});
		return {
			msg: "Questionnaire Added",
			data: response,
		};
	} catch (error) {
		console.log(error, "error");
		throw error;
	}
};

module.exports.viewAllQuestionnaireService = async (req, res) => {
	try {
		let response = await Questionnaire.find();

		if (response) {
			return {
				msg: "success",
				data: response,
			};
		} else {
			return {
				msg: "faild",
				data: response,
			};
		}
	} catch (err) {
		throw err;
	}
};

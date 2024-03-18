// services/questionnaireService.js
const quizScore = require("../../schemas/quiz/quizScore");

// Implement service functions here
module.exports.addQuizScoreDetailsService = async (req, res) => {
	try {
		const { age, depression_level, previous_child_birth_experiences, marital_status_divorced, marital_status_married, marital_status_single, family_background_bad, family_background_good, family_background_normal } = req; // Assuming the data is in the request body
		const response = await quizScore.create({
            age,
            depression_level,
            previous_child_birth_experiences,
            marital_status_divorced,
            marital_status_married,
            marital_status_single,
            family_background_bad,
            family_background_good,
            family_background_normal,
		});
		return {
			msg: "Quiz Details Added",
			data: response,
		};
	} catch (error) {
		console.log(error, "error");
		throw error;
	}
};

module.exports.viewAllQuizScoreDetailsService = async (req, res) => {
	try {
		let response = await quizScore.find();

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

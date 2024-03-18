// controllers/questionnaireController.js
const quizScoreService = require("../../services/quiz/quizScoreService");
const {
	ResponseStatusCodes,
} = require("../../util/constants/responseStatusCodes");
const {
	ResponseCommonMessages,
} = require("../../util/constants/responseCommonMessages");

// Implement controller functions here
module.exports.addQuizDetailsController = async (req, res) => {
	try {
		const quizDetailsResponse =
			await quizScoreService.addQuizScoreDetailsService(req.body);
		return res.status(200).json({
			success: true,
			data: quizDetailsResponse.data,
			showMessage: false,
		});
	} catch (err) {
		return res
			.status(
				err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR,
			)
			.json({
				success: false,
				msg:
					err.msg ||
					ResponseCommonMessages.INTERNAL_SERVER_ERROR,
			});
	}
};

module.exports.viewQuizDetailsController = async (req, res) => {
	try {
		let quizDetailsResponse =
			await quizScoreService.viewAllQuizScoreDetailsService(req);
		return res.status(200).send({
			success: true,
			data: quizDetailsResponse.data,
			showMessage: false,
		});
	} catch (err) {
		return res
			.status(
				err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR,
			)
			.json({
				success: false,
				msg:
					err.msg ||
					ResponseCommonMessages.INTERNAL_SERVER_ERROR,
			});
	}
};

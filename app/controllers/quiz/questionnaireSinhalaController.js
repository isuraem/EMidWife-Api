// controllers/questionnaireController.js
const questionnaireService = require("../../services/quiz/questionnaireSinhalaService");
const {
	ResponseStatusCodes,
} = require("../../util/constants/responseStatusCodes");
const {
	ResponseCommonMessages,
} = require("../../util/constants/responseCommonMessages");

// Implement controller functions here
module.exports.addQuestionnaireController = async (req, res) => {
	try {
		const questionnaireResponse =
			await questionnaireService.addQuestionnaireService(req.body);
		return res.status(200).json({
			success: true,
			data: questionnaireResponse.data,
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

module.exports.viewQuestionnaireController = async (req, res) => {
	try {
		let questionnaireResponse =
			await questionnaireService.viewAllQuestionnaireService(req);
		return res.status(200).send({
			success: true,
			data: questionnaireResponse.data,
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

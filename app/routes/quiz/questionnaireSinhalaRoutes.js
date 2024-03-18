// routes/questionnaireRoutes.js
module.exports = function (router) {
	var bodyParser = require("body-parser");
	var jsonParser = bodyParser.json();
	const questionnaireSinhalaController = require("../../controllers/quiz/questionnaireSinhalaController");

	router.post(
		"/add_sinhala",
		jsonParser,
		questionnaireSinhalaController.addQuestionnaireController
	);

	router.get(
		"/all_sinhala",
		jsonParser,
		questionnaireSinhalaController.viewQuestionnaireController,
	);
};

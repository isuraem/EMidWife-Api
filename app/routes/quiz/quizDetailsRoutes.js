// routes/questionnaireRoutes.js
module.exports = function (router) {
	var bodyParser = require("body-parser");
	var jsonParser = bodyParser.json();
	const quizDetailsController = require("../../controllers/quiz/quizDetailsController");

	router.post(
		"/quiz_details",
		jsonParser,
		quizDetailsController.addQuizDetailsController
	);

	router.get(
		"/all_quiz_details",
		jsonParser,
		quizDetailsController.viewQuizDetailsController,
	);
	// Define your routes
};

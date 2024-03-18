// // routes/questionnaireRoutes.js
// const express = require("express");
// const router = express.Router();
// const {
// 	addQuestionnaireController,
//     viewQuestionnaireController,
// } = require("../../controllers/quiz/questionnaireEnglishController");

// router.post('/add', addQuestionnaireController);
// router.get("/all", viewQuestionnaireController);
// // Define your routes here
// module.exports = router;

module.exports = function (router) {
	var bodyParser = require('body-parser');
	var jsonParser = bodyParser.json();

	const questionnaireEnglishController = require('../../controllers/quiz/questionnaireEnglishController');
	const validationsMiddleware = require('../../validators/commonValidatorsjoi');

	router.post('/add_english',
		jsonParser,
		questionnaireEnglishController.addQuestionnaireController
	);

	router.get('/all_english',
		jsonParser,
		questionnaireEnglishController.viewQuestionnaireController
	);

};
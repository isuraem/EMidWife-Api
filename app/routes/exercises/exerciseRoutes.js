module.exports = function (router) {
	var bodyParser = require('body-parser');
	var jsonParser = bodyParser.json();

	//router controllers 
	const exerciseController = require('../../controllers/exercise/exerciseController');
	const validationsMiddleware = require('../../validators/commonValidatorsjoi');


	router.post('/add_exercise',
		jsonParser,
		exerciseController.addExercise
	);
};
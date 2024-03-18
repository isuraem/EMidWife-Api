module.exports = function (router) {
	var bodyParser = require('body-parser');
	var jsonParser = bodyParser.json();

	//router controllers 
	const weekController = require('../../controllers/week/weekController');
	const validationsMiddleware = require('../../validators/commonValidatorsjoi');


	router.post('/create_week',
		jsonParser,
		weekController.createWeek
	);


};
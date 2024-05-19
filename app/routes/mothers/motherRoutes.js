module.exports = function (router) {
	var bodyParser = require('body-parser');
	var jsonParser = bodyParser.json();

	//router controllers 
	const motherController = require('../../controllers/mother/motherController');
	const validationsMiddleware = require('../../validators/commonValidatorsjoi');


	router.post('/add_mother',
		jsonParser,
		motherController.addMother
	);

	router.post('/login',
		jsonParser,
		motherController.login
	);

	router.post('/user-details',
		jsonParser,
		motherController.getUserDetails
	);

	router.post('/initial_exercises',
		jsonParser,
		motherController.addInitialExercises
	);

	router.post('/get_all_exercise_day',
		jsonParser,
		motherController.getAllExerciseDay
	);

	router.post('/update_device_status',
		jsonParser,
		motherController.updateWearbleDeviceStatus
	);

};
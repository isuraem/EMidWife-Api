let mongoose = require('mongoose');
let Exercise = require('../../schemas/exercise');

const BadRequestException = require('./../../util/exceptions/badRequestException');
const moment = require('moment');

module.exports.addExercise = async (requestBody) => {

	//initiate session
	const session = await mongoose.startSession();
	//start the transaction
	session.startTransaction();

	const {
		exercise_name,
		exercise_img_url,
		exercise_video_url,
		exercise_rounds,
		exer_no,
		exercise_level,
		exercise_type,
		duration,
		waiting_time,
		special_notes
	} = requestBody;

	try {
		
		const newExerObj = {
			exercise_name: exercise_name,
			exercise_img_url: exercise_img_url,
			exercise_video_url: exercise_video_url ,
			exercise_rounds: exercise_rounds,
			exer_no: exer_no,
			exercise_level: exercise_level,
			exercise_type: exercise_type,
			duration: duration,
			waiting_time: waiting_time,
		}
		//create new user obj
		let newExercise = new Exercise(newExerObj);
		newExercise.$session(session);
		await newExercise.save();

		await session.commitTransaction();
		return {
			msg: 'Successfully joined.'

		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};
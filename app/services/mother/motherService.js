let mongoose = require('mongoose');
let Mother = require('../../schemas/mother');
let Week = require('../../schemas/week');
let Exercise = require('../../schemas/exercise');
let WeekExerciseSession = require('../../schemas/weekExerciseSession');
const BadRequestException = require('./../../util/exceptions/badRequestException');
const moment = require('moment');

module.exports.addMother = async (requestBody) => {

	//initiate session
	const session = await mongoose.startSession();
	//start the transaction
	session.startTransaction();

	const {
		name,
		password,
		email,
		age,
		week
	} = requestBody;

	try {
		let trimesters = null;
		if (week <= 12) {
			trimesters = 1
		}
		else if (week >= 13 && week <= 26) {
			trimesters = 2
		}
		else if (week >= 27) {
			trimesters = 3
		}
		const newMotherObj = {
			name: name,
			password: password,
			email: email,
			age: age,
			week: week,
			trimester: trimesters
		}
		//create new user obj
		let newMother = new Mother(newMotherObj);
		newMother.$session(session);
		let createdObj = await newMother.save();


		await session.commitTransaction();
		return {
			msg: 'Successfully joined.',
			data : createdObj
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.login = async (requestBody) => {

	//initiate session
	const session = await mongoose.startSession();
	//start the transaction
	session.startTransaction();

	const {
		password,
		email
	} = requestBody;

	try {

		//create new user obj
		let motherObj = await Mother.findOne({ 'email': email, 'password': password });

		if (!motherObj) {
			throw new BadRequestException('Incorrect email or password provided.');
		}
		return {
			msg: 'Successfully joined.',
			data: motherObj
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.addInitialExercises = async (requestBody) => {

	//initiate session
	const session = await mongoose.startSession();
	//start the transaction
	session.startTransaction();

	try {

		//create new user obj
		let motherObj = await Mother.findById(requestBody._id);

		if (!motherObj) {
			throw new BadRequestException('Mother data not received.');
		}

		let todayDate = moment().format();
		let todayDateByFormat = moment(todayDate).format('dddd');
		let week = motherObj.week;
		let trimester = motherObj.trimester;
		let activeStatus = motherObj.is_exercises_active;
		let riskLevel = requestBody.riskLevel;
		let exerciseArray = [];
		console.log("date", todayDate)

		let weekObj = await Week.findOne({
			'end_date': { $gte: todayDate },
			'start_date': { $lte: todayDate }
		})

		if (!weekObj) {
			throw new BadRequestException('Week not created');
		}

		motherObj.risk_level = riskLevel === 0 ? "high risk" : riskLevel === 1 ? "low risk" : riskLevel === 2 ? "mid risk" : null;
		motherObj.risk_level_status = riskLevel === 0 ? 20 : riskLevel === 1 ? 0 : riskLevel === 2 ? 10 : null;
		motherObj.is_exercises_active = true;
		motherObj.$session(session);
		await motherObj.save();

		//0:"high risk",1:"low risk",2:"mid risk"
		if (trimester === 1) {
			if (riskLevel === 1) {
				exerciseArray = await Exercise.find({ exercise_level: { $in: [10, 40, 60, 70] } })
			}
			if (riskLevel === 2) {
				exerciseArray = await Exercise.find({ exercise_level: { $in: [10, 40, 60, 70] } })
			}
			if (riskLevel === 0) {
				exerciseArray = await Exercise.find({ exercise_level: { $in: [10, 40, 60, 70] } })
			}

		}
		if (trimester === 2) {
			if (riskLevel === 1) {
				exerciseArray = await Exercise.find({ exercise_level: { $in: [20, 50, 40, 70] } })
			}
			if (riskLevel === 2) {
				exerciseArray = await Exercise.find({ exercise_level: { $in: [20, 50, 40, 70] } })
			}
			if (riskLevel === 0) {
				exerciseArray = await Exercise.find({ exercise_level: { $in: [20, 50, 40, 70] } })
			}
		}
		if (trimester === 3) {
			if (riskLevel === 1) {
				exerciseArray = await Exercise.find({ exercise_level: { $in: [30, 50, 60, 70] } })
			}
			if (riskLevel === 2) {
				exerciseArray = await Exercise.find({ exercise_level: { $in: [30, 50, 60, 70] } })
			}
			if (riskLevel === 0) {
				exerciseArray = await Exercise.find({ exercise_level: { $in: [30, 50, 60, 70] } })
			}
		}
		let newWeekExerciseSession = null;
		if (todayDateByFormat === "Monday" || todayDateByFormat === "Tuesday") {
			let dataArray = [];
			for (let index = 0; index < exerciseArray.length; index++) {
				let data = {
					exercise: exerciseArray[index]._id,
					exercise_rounds: exerciseArray[index].exercise_rounds
				}
				dataArray.push(data)
			}
			console.log("dada1", dataArray)
			// let 
			const newExerObj = {
				week_no: week,
				mother: motherObj._id,
				week: weekObj._id,
				day_first: dataArray,
				state: 10
			}

			newWeekExerciseSession = new WeekExerciseSession(newExerObj);
			newWeekExerciseSession.$session(session);
			await newWeekExerciseSession.save();
			console.log("data", newExerObj)
		}
		if (todayDateByFormat === "Wednesday" || todayDateByFormat === "Thursday") {
			let dataArray = [];
			for (let index = 0; index < exerciseArray.length; index++) {
				let data = {
					exercise: exerciseArray[index]._id,
					exercise_rounds: exerciseArray[index].exercise_rounds
				}
				dataArray.push(data)
			}
			const newExerObj = {
				week_no: week,
				mother: motherObj._id,
				week: weekObj._id,
				day_two: dataArray,
				state: 10
			}

			newWeekExerciseSession = new WeekExerciseSession(newExerObj);
			newWeekExerciseSession.$session(session);
			await newWeekExerciseSession.save();
			console.log("data", newExerObj)
		}
		if (todayDateByFormat === "Friday" || todayDateByFormat === "Saturday" || todayDateByFormat === "Sunday") {
			let dataArray = [];
			for (let index = 0; index < exerciseArray.length; index++) {
				let data = {
					exercise: exerciseArray[index]._id,
					exercise_rounds: exerciseArray[index].exercise_rounds
				}
				dataArray.push(data)
			}
			console.log("dada3", dataArray)
			const newExerObj = {
				week_no: week,
				mother: motherObj._id,
				week: weekObj._id,
				day_third: dataArray,
				state: 10
			}

			newWeekExerciseSession = new WeekExerciseSession(newExerObj);
			newWeekExerciseSession.$session(session);
			await newWeekExerciseSession.save();
		}
		await session.commitTransaction();
		console.log("dataatat", newWeekExerciseSession)
		return {
			msg: 'Successfully joined.',
			data: newWeekExerciseSession
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

module.exports.getAllExerciseDay = async (requestBody) => {

	//initiate session
	const session = await mongoose.startSession();
	//start the transaction
	session.startTransaction();

	try {

		//create new user obj
		let motherObj = await Mother.findById(requestBody._id);

		if (!motherObj) {
			throw new BadRequestException('Mother data not received.');
		}

		let dayOfWeek = requestBody.day;
		let weekSessionObj = await WeekExerciseSession.findOne({ mother: requestBody._id, week_no: motherObj.week })
		console.log("data", weekSessionObj)
		let exerciseDataArray = [];
		if (dayOfWeek == 1) {
			for (let index = 0; index < weekSessionObj.day_first.length; index++) {
				let exerciseData = await Exercise.findOne({ _id: weekSessionObj.day_first[index].exercise });
				let data = {
					rounds: weekSessionObj.day_first[index].exercise_rounds.rounds,
					cycles: weekSessionObj.day_first[index].exercise_rounds.cycles,
					exercise_name: exerciseData.exercise_name,
					exercise_img_url: exerciseData.exercise_img_url,
					exercise_video_url: exerciseData.exercise_video_url,
					is_wearble: exerciseData.is_wearble,
					exer_no: exerciseData.exer_no,
					exercise_level: exerciseData.exercise_level,
					risk_Level: exerciseData.risk_Level,
					exercise_type: exerciseData.exercise_type,
					duration: exerciseData.duration,
					description: exerciseData.description,
					exer_steps: exerciseData.exer_steps,
					waiting_time: exerciseData.waiting_time,
					special_notes: exerciseData.special_notes,
					_id: exerciseData._id,
				}
				exerciseDataArray.push(data)
			}
		}
		if (dayOfWeek == 2) {
			for (let index = 0; index < weekSessionObj.day_two.length; index++) {
				let exerciseData = await Exercise.findOne({ _id: weekSessionObj.day_two[index].exercise });
				let data = {
					rounds: weekSessionObj.day_two[index].exercise_rounds.rounds,
					cycles: weekSessionObj.day_two[index].exercise_rounds.cycles,
					exercise_name: exerciseData.exercise_name,
					exercise_img_url: exerciseData.exercise_img_url,
					exercise_video_url: exerciseData.exercise_video_url,
					is_wearble: exerciseData.is_wearble,
					exer_no: exerciseData.exer_no,
					exercise_level: exerciseData.exercise_level,
					risk_Level: exerciseData.risk_Level,
					exercise_type: exerciseData.exercise_type,
					duration: exerciseData.duration,
					description: exerciseData.description,
					exer_steps: exerciseData.exer_steps,
					waiting_time: exerciseData.waiting_time,
					special_notes: exerciseData.special_notes,
					_id: exerciseData._id
				}
				exerciseDataArray.push(data)
			}

		}
		if (dayOfWeek == 3) {
			if (weekSessionObj.day_third.length > 0) {
				for (let index = 0; index < weekSessionObj.day_third.length; index++) {
					let exerciseData = await Exercise.findOne({ _id: weekSessionObj.day_third[index].exercise });
					let data = {
						rounds: weekSessionObj.day_third[index].exercise_rounds.rounds,
						cycles: weekSessionObj.day_third[index].exercise_rounds.cycles,
						exercise_name: exerciseData.exercise_name,
						exercise_img_url: exerciseData.exercise_img_url,
						exercise_video_url: exerciseData.exercise_video_url,
						is_wearble: exerciseData.is_wearble,
						exer_no: exerciseData.exer_no,
						exercise_level: exerciseData.exercise_level,
						risk_Level: exerciseData.risk_Level,
						exercise_type: exerciseData.exercise_type,
						duration: exerciseData.duration,
						description: exerciseData.description,
						exer_steps: exerciseData.exer_steps,
						waiting_time: exerciseData.waiting_time,
						special_notes: exerciseData.special_notes,
						_id: exerciseData._id
					}
					exerciseDataArray.push(data)
				}
			}

		}

		await session.commitTransaction();
		return {
			msg: 'Successfully joined.',
			data: exerciseDataArray
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};


module.exports.updateWearbleDeviceStatus = async (requestBody) => {

	//initiate session
	const session = await mongoose.startSession();
	//start the transaction
	session.startTransaction();

	try {

		//create new user obj
		let motherObj = await Mother.findById(requestBody._id);

		if (!motherObj) {
			throw new BadRequestException('Mother data not received.');
		}
		let deviceStatus = requestBody.deviceStatus;
		motherObj.is_wearble_device = deviceStatus;
		motherObj.$session(session);
		await motherObj.save();

		await session.commitTransaction();
		
		return {
			msg: 'Successfully joined.',
			data: motherObj
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};
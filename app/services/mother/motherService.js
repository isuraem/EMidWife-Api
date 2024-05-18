let mongoose = require('mongoose');
let Mother = require('../../schemas/mother');
let Week = require('../../schemas/week');
let Exercise = require('../../schemas/exercise');
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
		if(week <= 12){
			trimesters = 1
		}
		else if(week >= 13 && week <= 26){
			trimesters = 2
		}
		else if(week >= 27){
			trimesters = 3
		}
		const newMotherObj = {
			name: name,
			password: password,
			email: email ,
			age: age,
			week: week,
			trimester: trimesters
		}
		//create new user obj
        let newMother = new Mother(newMotherObj);
		newMother.$session(session);
		await newMother.save();
	

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
        let motherObj = await Mother.findOne({'email': email, 'password': password});
		
		if(!motherObj){
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

module.exports.getUserDetails = async (email) => {
    try {
        const mother = await Mother.findOne({ email: email }).exec();
        if (!mother) {
            throw new Error('No user found with the given email.');
        }
        return {
            msg: 'User details retrieved successfully.',
            data: mother
        };
    } catch (err) {
        throw {
            msg: err.message,
            status: 404 // Not Found, but you can adjust the status code based on your needs
        };
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
		
		if(!motherObj){
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
			'end_date': { $gte: todayDate},
			'start_date': {$lte: todayDate}
		})

		if(!weekObj){
			throw new BadRequestException('Week not created');
		}

		// motherObj.risk_level = riskLevel === 0 ? "high risk" : riskLevel === 1 ? "low risk" : riskLevel === 2 ? "mid risk"  : null;
		// motherObj.risk_level_status = riskLevel === 0 ? 20 : riskLevel === 1 ? 0 : riskLevel === 2 ? 10  : null;
		// motherObj.$session(session);
		// await motherObj.save();
		
		//0:"high risk",1:"low risk",2:"mid risk"
		if(trimester === 1){
			if(riskLevel === 1){
				exerciseArray = await Exercise.find({exercise_level: { $in: [10, 40, 60, 70] }})
			}
			if(riskLevel === 2){
				exerciseArray = await Exercise.find({exercise_level: { $in: [10, 40, 60, 70] }})
			}
			if(riskLevel === 0){
				exerciseArray = await Exercise.find({exercise_level: { $in: [10, 40, 60, 70] }})
			}
			
		}
		if(trimester === 2){
			if(riskLevel === 1){
				exerciseArray = await Exercise.find({exercise_level: { $in: [20, 50, 40, 70] }})
			}
			if(riskLevel === 2){
				exerciseArray = await Exercise.find({exercise_level: { $in: [20, 50, 40, 70] }})
			}
			if(riskLevel === 0){
				exerciseArray = await Exercise.find({exercise_level: { $in: [20, 50, 40, 70] }})
			}
		}
		if(trimester === 3){
			if(riskLevel === 1){
				exerciseArray = await Exercise.find({exercise_level: { $in: [30, 50, 60, 70] }})
			}
			if(riskLevel === 2){
				exerciseArray = await Exercise.find({exercise_level: { $in: [30, 50, 60, 70] }})
			}
			if(riskLevel === 0){
				exerciseArray = await Exercise.find({exercise_level: { $in: [30, 50, 60, 70] }})
			}
		}
		let newExercise = null;
		if (todayDateByFormat === "Monday" || todayDateByFormat === "Tuesday" ){
			let dataArray = [];
			for(let index = 0 ; index < exerciseArray.length; index++){
				let data = {
					exercise: exerciseArray[index]._id,
					exercise_rounds: exerciseArray[index].exercise_rounds
				}
				dataArray.push(data)
			}
			console.log("dada1",dataArray )
			// let 
			const newExerObj = {
				week_no: week,
				mother: motherObj._id,
				week:  weekObj._id,
				day_first: dataArray,
				state: 10
			}
			//create new user obj
			// newExercise = new Exercise(newExerObj);
			// newExercise.$session(session);
			// await newExercise.save();
			console.log("data", newExerObj)
		}
		if(todayDateByFormat === "Wednesday" || todayDateByFormat === "Thursday"){
			let dataArray = [];
			for(let index = 0 ; index < exerciseArray.length; index++){
				let data = {
					exercise: exerciseArray[index]._id,
					exercise_rounds: exerciseArray[index].exercise_rounds
				}
				dataArray.push(data)
			}
			const newExerObj = {
				week_no: week,
				mother: motherObj._id,
				week:  weekObj._id,
				day_two: dataArray,
				state: 10
			}
			//create new user obj
			// newExercise = new Exercise(newExerObj);
			// newExercise.$session(session);
			// await newExercise.save();
			console.log("data", newExerObj)
		}
		if(todayDateByFormat === "Friday" || todayDateByFormat === "Saturday" || todayDateByFormat === "Sunday"){
			let dataArray = [];
			for(let index = 0 ; index < exerciseArray.length; index++){
				let data = {
					exercise: exerciseArray[index]._id,
					exercise_rounds: exerciseArray[index].exercise_rounds
				}
				dataArray.push(data)
			}
			console.log("dada3",dataArray )
			const newExerObj = {
				week_no: week,
				mother: motherObj._id,
				week:  weekObj._id,
				day_third: dataArray,
				state: 10
			}
			console.log("data", newExerObj)
			//create new user obj
			// newExercise = new Exercise(newExerObj);
			// newExercise.$session(session);
			// await newExercise.save();
		}
		console.log("dataatat", newExercise)
		return {
			msg: 'Successfully joined.',
			data: newExercise
		};

	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};


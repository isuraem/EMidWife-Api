let mongoose = require('mongoose');
let Mother = require('../../schemas/mother');

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
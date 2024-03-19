let mongoose = require('mongoose');
let Week = require('../../schemas/week');

const BadRequestException = require('./../../util/exceptions/badRequestException');
const moment = require('moment');

module.exports.createWeek = async (requestBody) => {

	//initiate session
	const session = await mongoose.startSession();
	//start the transaction
	session.startTransaction();

	try {
        let fetchDate = requestBody.date;
        let weekStartDate = null;
        let started_date_num = null;
        let end_date = null;
        if(fetchDate){
            let dayOfWeek = moment(fetchDate).format('dddd');
            if(dayOfWeek === "Monday"){
                weekStartDate = moment(fetchDate).format();
                started_date_num = 1;
                end_date = moment(fetchDate).add(6, 'days').format();
                console.log("data", weekStartDate, started_date_num, end_date)
            }
            if(dayOfWeek === "Tuesday"){
                weekStartDate = moment(fetchDate).subtract(1, 'days').format();
                started_date_num = 2;
                end_date = moment(fetchDate).add(5, 'days').format();
                console.log("data", weekStartDate, started_date_num, end_date)
            }
            if(dayOfWeek === "Wednesday"){
                weekStartDate = moment(fetchDate).subtract(2, 'days').format();
                started_date_num = 3;
                end_date = moment(fetchDate).add(4, 'days').format();
                console.log("data", weekStartDate, started_date_num, end_date)
            }
            if(dayOfWeek === "Thursday"){
                weekStartDate = moment(fetchDate).subtract(3, 'days').format();
                started_date_num = 4;
                end_date = moment(fetchDate).add(3, 'days').format();
                console.log("data", weekStartDate, started_date_num, end_date)
            }
            if(dayOfWeek === "Friday"){
                weekStartDate = moment(fetchDate).subtract(4, 'days').format();
                started_date_num = 5;
                end_date = moment(fetchDate).add(2, 'days').format();
                console.log("data", weekStartDate, started_date_num, end_date)
            }
            if(dayOfWeek === "Saturday"){
                weekStartDate = moment(fetchDate).subtract(5, 'days').format();
                started_date_num = 6;
                end_date = moment(fetchDate).add(1, 'days').format();
                console.log("data", weekStartDate, started_date_num, end_date)
            }
            if(dayOfWeek === "Sunday"){
                weekStartDate = moment(fetchDate).subtract(6, 'days').format();
                started_date_num = 7;
                end_date = moment(fetchDate).format();
                console.log("data", weekStartDate, started_date_num, end_date)
            }

            const newWeekObj = {
                start_date: weekStartDate,
                end_date: end_date,
                started_date_num: started_date_num
            }
            //create new week obj
            let newWeek = new Week(newWeekObj);
            newWeek.$session(session);
            await newWeek.save();
        }
        else{
			throw new BadRequestException('Error in the date');
        }
	
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
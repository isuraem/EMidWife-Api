const motherService = require('../../services/mother/motherService');
const { ResponseStatusCodes } = require('./../../util/constants/responseStatusCodes');
const { ResponseCommonMessages } = require('./../../util/constants/responseCommonMessages');
const Logger = require('../../util/logging/logger');

module.exports.addMother = async (req, res) => {
	try {
		const serviceResponse = await motherService.addMother(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg , data:serviceResponse.data, showMessage:false });
	} catch (err) {
		Logger.log('addMother', null, null,err);
		return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
	}
};

module.exports.login = async (req, res) => {
	try {
		const serviceResponse = await motherService.login(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg , data:serviceResponse.data, showMessage:false });
	} catch (err) {
		Logger.log('login', null, null,err);
		return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
	}
};

// GET user details
module.exports.getUserDetails = async (req, res) => {
    try {
        const email = req.query.email; // Assuming the email is passed as a query parameter
        if (!email) {
            return res.status(400).json({ success: false, msg: 'Email parameter is required.' });
        }
        const serviceResponse = await motherService.getUserDetails(email);
        return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data });
    } catch (err) {
        Logger.log('getUserDetails', null, null, err);
        return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
    }
};


module.exports.addInitialExercises = async (req, res) => {
	try {
		const serviceResponse = await motherService.addInitialExercises(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg , data:serviceResponse.data, showMessage:false });
	} catch (err) {
		Logger.log('addWeeklyExercises', null, null,err);
		return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
	}
};

module.exports.getAllExerciseDay = async (req, res) => {
	try {
		const serviceResponse = await motherService.getAllExerciseDay(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg , data:serviceResponse.data, showMessage:false });
	} catch (err) {
		Logger.log('getAllExerciseDay', null, null,err);
		return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
	}
};

module.exports.updateWearbleDeviceStatus = async (req, res) => {
	try {
		const serviceResponse = await motherService.updateWearbleDeviceStatus(req.body);
		return res.status(200).json({ success: true, msg: serviceResponse.msg , data:serviceResponse.data, showMessage:false });
	} catch (err) {
		Logger.log('updateWearbleDeviceStatus', null, null,err);
		return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
	}
};
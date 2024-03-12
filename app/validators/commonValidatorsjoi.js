const Joi = require('joi'); 
const { ResponseStatusCodes } = require('../util/constants/responseStatusCodes');
const { ResponseCommonMessages } = require('./../util/constants/responseCommonMessages');

const validationsMiddleware = (schema, type) => { 
	return (req, res, next) => { 
		const { error } = Joi.validate(req.body, schema);
		if (error == null) {
			next(); 
		} else { 
			const { details } = error; 
			const message = details.map(i => i.message).join(',');            
			return res.status(ResponseStatusCodes.BAD_REQUEST).json({ success: false, msg: ResponseCommonMessages.VALIDATIONS_ERROR, reason:message });
		} 
	}; 
}; 
module.exports = validationsMiddleware;
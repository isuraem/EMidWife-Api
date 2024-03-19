// const { number } = require('joi');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MotherSchema = new Schema({
    name: {
        type: String
    },
    password:{
        type: String
    },
	email: {
		type: String,
		index: true,
		required: true
	},
    age: {
        type: Number
    },
    week: {
        type: Number
    },
    trimester: {
        type: Number
    },
    is_exercises_active: {
        type: Boolean,
        default: false
    },
    is_daily_works_active:{
        type: Boolean
    },
    risk_level:{
        type: String
    },
    risk_level_status:{
        type: Number  // 0 -> low , 10 -> medium , 20 -> high 
    },
    state: {
        type: Number,
        default: 0 // 0 -> active
    }

}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});


module.exports = mongoose.model('Mother', MotherSchema);
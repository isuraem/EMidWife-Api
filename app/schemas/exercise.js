// const { number } = require('joi');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ExerciseSchema = new Schema({
	exercise_name: {
		type: String,
		index: true,
		required: true
	},
	exercise_img_url: {
		type: String,
	},
    exercise_video_url: {
        type: String
    },
    exercise_rounds: {
        cycles: {
            type: Number
        },
        rounds: {
            type: Number
        },
    },
    is_wearble:{
        type: Boolean
    },
    exer_no:{
        type: Number
    },
    exercise_level: {
        type : Number // 10 -> only first trimester , 20 -> only second trimester , 30 -> only third trimester, 40  -> 1st and second, 50 -> 2nd and 3rd
                      //60 -> 3rd and 1st , 70 -> all
    },
    risk_Level:{
        type : Number // 10 -> low , 20 -> medium , 30 -> high, 40  -> low and medium, 50 -> medium and high
        //60 -> high and low , 70 -> all
    },
    exercise_type: {
        type: Number // 0 -> normal, 10 -> strength
    },
    duration: {
        type: Number
    },
    description:{
        type: String
    },
    exer_steps:[
        {
            step : {
                type: String
            }
        },
    ],
    waiting_time : {
        type: Number
    },
	special_notes: [{
		note: {
			type: String,
		}
	}]

}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});


module.exports = mongoose.model('Exercise', ExerciseSchema);
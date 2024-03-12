// const { number } = require('joi');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var WeekExerciseSessionSchema = new Schema({
    week_no: {
        type: Number
    },
    mother: {
		type: Schema.Types.ObjectId,
		ref: 'Mother',
		required: true
	},
    week: {
		type: Schema.Types.ObjectId,
		ref: 'Week',
		required: true
	},
    day_first: [
        {
            exercise: {
                type: Schema.Types.ObjectId,
                ref: 'Exercise',
                required: true
            },
            exercise_rounds: {
                cycles: {
                    type: Number
                },
                rounds: {
                    type: Number
                },
            },
            progress:[
                {
                    session: {
                        type: Number
                    },
                    count: {
                        type: Number
                    }
                }
            ],
            total_progress: {
                type: Number
            }    
        }
    ],
    day_two: [
        {
            exercise: {
                type: Schema.Types.ObjectId,
                ref: 'Exercise',
                required: true
            },
            exercise_rounds: {
                cycles: {
                    type: Number
                },
                rounds: {
                    type: Number
                },
            },
            progress:[
                {
                    session: {
                        type: Number
                    },
                    count: {
                        type: Number
                    }
                }
            ],
            total_progress: {
                type: Number
            }   
        }
    ],
    day_third: [
        {
            exercise: {
                type: Schema.Types.ObjectId,
                ref: 'Exercise',
                required: true
            },
            exercise_rounds: {
                cycles: {
                    type: Number
                },
                rounds: {
                    type: Number
                },
            },
            progress:[
                {
                    session: {
                        type: Number
                    },
                    count: {
                        type: Number
                    }
                }
            ],
            total_progress: {
                type: Number
            }   
        }
    ],
    week_progress:{
        type: Number
    },
    state: {
        type: Number,
        default: 0 // 0 -> active, -10 -> disable
    }

}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});


module.exports = mongoose.model('WeekExerciseSession', WeekExerciseSessionSchema);
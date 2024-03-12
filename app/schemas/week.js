// const { number } = require('joi');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var WeekSchema = new Schema({
    start_date: {
        type: String
    },
    end_date:{
        type: String
    }
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});


module.exports = mongoose.model('Week', WeekSchema);
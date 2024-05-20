const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: String,
  message: String,
  response: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);

const mongoose = require('mongoose');

const voterSchema = mongoose.Schema({
  voterID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  pinCode: {
    type: Number,
    required: true,
    min: 100000,
    max: 999999,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  hasRegistered: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Voters', voterSchema);

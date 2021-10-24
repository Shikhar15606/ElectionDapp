const mongoose = require('mongoose');

const statsSchema = mongoose.Schema({
  registeredUsers: {
    type: Number,
    required: true,
    default: 0,
  },
  votesCasted: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('stats', statsSchema);

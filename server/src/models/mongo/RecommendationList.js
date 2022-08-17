const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  id: {
    type: 'String',
    required: true,
    unique: true,
  },
  userId: {
    type: 'Number',
    required: true,
  },
  display: {
    type: 'Boolean',
    default: false,
  }
});

module.exports = mongoose.model('RecommendationList', Schema);
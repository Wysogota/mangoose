const mongoose = require('mongoose');

const listOptions = {
  type: 'String',
  required: true,
};

const Schema = new mongoose.Schema({
  userId: {
    type: 'Number',
    required: true,
  },
  lists: {
    reading: [listOptions],
    planning: [listOptions],
    completed: [listOptions],
    stopped: [listOptions]
  }
});

module.exports = mongoose.model('MangaLists', Schema);

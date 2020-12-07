const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moveSchema = new Schema({
  user: String,
  word: [
    {
      row: Number,
      col: Number,
      letter: String,
    },
  ],
  score: Number,
});

module.exports = mongoose.model('Move', moveSchema);

const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const pollSchema = new Schema({
  user: {
    type: String ,
    require: true,
    ref: 'User'
  },
  title: {
    type: String,
    require: true
  },
  quest: {
    type: String,
    require: true
  },
  options: [{
    name: { type: String, required: true },
    count: { type: Number, default: 0 }
  }]
}, {
  timestamps: true
});

module.exports = model('Poll', pollSchema);

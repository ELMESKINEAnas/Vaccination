const mongoose = require('mongoose');
const centreSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
},{collection:"centres"});
module.exports = mongoose.model('Centre',centreSchema);